<?php

/**
 * Field handler for terms.
 */
class views_handler_field_term_node_tid extends views_handler_field_prerender_list {
  function init(&$view, $options) {
    parent::init($view, $options);
    if ($view->base_table == 'node_revisions') {
      $this->additional_fields['vid'] = array('table' => 'node_revisions', 'field' => 'vid');
    }
    else {
      $this->additional_fields['vid'] = array('table' => 'node', 'field' => 'vid');
    }
  }

  function option_definition() {
    $options = parent::option_definition();

    $options['link_to_taxonomy'] = array('default' => TRUE);
    $options['limit'] = array('default' => FALSE);
    $options['vids'] = array('default' => array());
    $options['reorder'] = array('default' => FALSE); 

    return $options;
  }

  /**
   * Provide "link to term" option.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['link_to_taxonomy'] = array(
      '#title' => t('Link this field to its term page'),
      '#type' => 'checkbox',
      '#default_value' => !empty($this->options['link_to_taxonomy']),
    );

    $form['limit'] = array(
      '#type' => 'checkbox',
      '#title' => t('Limit terms by vocabulary'),
      '#default_value'=> $this->options['limit'],
    );

    $form['reorder'] = array(
      '#type' => 'checkbox',
      '#title' => t('Reorder terms to match hierarchy'),
      '#description' => t('Terms will be displayed in hierarchical order. Items MUST be tagged with at least the root term. If a level in the hierarchy is missed then subsequent terms will be ignored.'), 
      '#default_value'=> $this->options['reorder'],
    );

    $options = array();
    $vocabularies = taxonomy_get_vocabularies();
    foreach ($vocabularies as $voc) {
      $options[$voc->vid] = check_plain($voc->name);
    }

    $form['vids'] = array(
      '#prefix' => '<div><div id="edit-options-vids">',
      '#suffix' => '</div></div>',
      '#type' => 'checkboxes',
      '#title' => t('Vocabularies'),
      '#options' => $options,
      '#default_value' => $this->options['vids'],
      '#process' => array('expand_checkboxes', 'views_process_dependency'),
      '#dependency' => array('edit-options-limit' => array(TRUE)),
    );
  }

  /**
   * Add this term to the query
   */
  function query() {
    $this->add_additional_fields();
  }

  function pre_render($values) {
    $this->field_alias = $this->aliases['vid'];
    $vids = array();
    foreach ($values as $result) {
      if (!empty($result->{$this->aliases['vid']})) {
        $vids[] = $result->{$this->aliases['vid']};
      }
    }

    if ($vids) {
      $voc = '';
      $voc_ids = array_filter($this->options['vids']);
      if (!empty($this->options['limit']) && !empty($voc_ids)) {
        $voc = " AND td.vid IN (" . implode(', ', array_keys($voc_ids)) . ")";
      }

      $result = db_query("SELECT tn.vid AS node_vid, td.*, v.name as vocabulary, th.parent FROM {term_data} td INNER JOIN {term_node} tn ON td.tid = tn.tid INNER JOIN {term_hierarchy} th on th.tid = td.tid INNER JOIN {vocabulary} v ON v.vid = td.vid WHERE tn.vid IN (" . implode(', ', $vids) . ")$voc ORDER BY td.weight, td.name");

      while ($term = db_fetch_object($result)) {
        $this->items[$term->node_vid][$term->tid]['name'] = check_plain($term->name);
        $this->items[$term->node_vid][$term->tid]['tid'] = $term->tid;
        $this->items[$term->node_vid][$term->tid]['parent'] = $term->parent;
        $this->items[$term->node_vid][$term->tid]['vid'] = $term->vid;
        $this->items[$term->node_vid][$term->tid]['vocabulary'] = check_plain($term->vocabulary);
        
        if (!empty($this->options['link_to_taxonomy'])) {
          $this->items[$term->node_vid][$term->tid]['make_link'] = TRUE;
          $this->items[$term->node_vid][$term->tid]['path'] = taxonomy_term_path($term);
        }
      }
      if (!empty($this->options['reorder']))
      {
        $this->order_vocabs();
      }
    }
  }
  
  /* Loop through each vocab sorting terms*/
  function order_vocabs() {
    foreach($this->items as &$item) {
       $this->sorted = array();
       $this->filter_parent = 0;
       $tmp =  $this->order_terms($item);  
       $item = $this->sorted;
    }
    unset($this->sorted);
    unset($this->filter_parent);
  }
  
  /* Recursivley add terms to array which are children of previously added term*/
  function order_terms($ary){
    $filt = array_filter($ary, array($this, "filter_for_parent"));
    $item = array_pop($filt);
   if ($item != NULL) {
      $this->sorted[$item['tid']] = $item;
      $this->filter_parent = $item['tid'];  
      $this->order_terms($ary);
    }
  }
  
  function filter_for_parent($item) {
    return $item['parent'] == $this->filter_parent;
  }

  function render_item($count, $item) {
    return $item['name'];
  }

  function document_self_tokens(&$tokens) {
    $tokens['[' . $this->options['id'] . '-tid' . ']'] = t('The taxonomy term ID for the term.');
    $tokens['[' . $this->options['id'] . '-name' . ']'] = t('The taxonomy term name for the term.');
    $tokens['[' . $this->options['id'] . '-vid' . ']'] = t('The vocabulary ID for the vocabulary the term belongs to.');
    $tokens['[' . $this->options['id'] . '-vocabulary' . ']'] = t('The name for the vocabulary the term belongs to.');
  }

  function add_self_tokens(&$tokens, $item) {
    $tokens['[' . $this->options['id'] . '-tid' . ']'] = $item['tid'];
    $tokens['[' . $this->options['id'] . '-name' . ']'] = $item['name'];
    $tokens['[' . $this->options['id'] . '-vid' . ']'] = $item['vid'];
    $tokens['[' . $this->options['id'] . '-vocabulary' . ']'] = $item['vocabulary'];
  }
}

