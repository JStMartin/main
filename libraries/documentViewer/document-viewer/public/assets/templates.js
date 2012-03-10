(function(){window.JST=window.JST||{};window.JST.annotation=_.template('<div class="DV-annotation <%= orderClass %> DV-<%= access %>" style="top:<%= top %>px;" id="DV-annotation-<%= id %>">  <div class="DV-annotationTab">    <div class="DV-annotationClose DV-trigger"></div>  </div>  <div class="DV-annotationRegion" style="margin-left:<%= excerptMarginLeft %>px; height:<%= excerptHeight %>px; width:<%= excerptWidth %>px;">    <div class="<%= access == \'public\' ? \'DV-ownerVisible\' : \'DV-contributorVisible\' %>">      <div class="DV-annotationEdge DV-annotationEdgeTop"></div>      <div class="DV-annotationEdge DV-annotationEdgeRight"></div>      <div class="DV-annotationEdge DV-annotationEdgeBottom"></div>      <div class="DV-annotationEdge DV-annotationEdgeLeft"></div>      <div class="DV-annotationCorner DV-annotationCornerTopLeft"></div>      <div class="DV-annotationCorner DV-annotationCornerTopRight"></div>      <div class="DV-annotationCorner DV-annotationCornerBottomLeft"></div>      <div class="DV-annotationCorner DV-annotationCornerBottomRight"></div>    </div>  </div>  <div class="DV-annotationContent">    <div class="DV-annotationHeader clearfix">      <div class="DV-pagination DV-editHidden">        <span class="DV-trigger DV-annotationPrevious" title="Previous Annotation">Previous</span>        <span class="DV-trigger DV-annotationNext" title="Next Annotation">Next</span>      </div>      <% if (access == \'private\') { %>        <div class="DV-annotationWarning DV-editVisible">This private note is only visible to you.</div>      <% } else { %>        <div class="DV-annotationWarning DV-editVisible">All viewers of this document can see this public note.</div>      <% } %>      <div class="DV-annotationGoto DV-editHidden"><div class="DV-trigger">p. <%= pageNumber %></div></div>      <div class="DV-annotationTitle DV-editHidden"><%= title %></div>      <input class="DV-annotationTitleInput DV-editVisible" type="text" placeholder="Annotation Title" value="<%= title %>" />      <% if (access == \'private\') { %>        <div class="DV-privateLock DV-editHidden" title="Private note"></div>      <% } %>      <div class="DV-showEdit DV-editHidden <%= access == \'public\' ? \'DV-ownerVisible\' : \'DV-contributorVisible\' %>"></div>    </div>    <div class="DV-annotationExcerpt" style="height:<%= excerptHeight %>px;">      <div class="DV-annotationExcerptImageTop" style="height:<%= excerptHeight %>px; width:<%= excerptWidth %>px;left:<%= excerptMarginLeft %>px;">        <img src="<%= image %>" style="left:-<%= excerptMarginLeft %>px; top:-<%= imageTop %>px;" width="<%= imageWidth %>" />      </div>      <div class="DV-annotationExcerptImage" style="height:<%= excerptHeight %>px;">        <img src="<%= image %>" style="top:-<%= imageTop - 2 %>px;" width="<%= imageWidth %>" />      </div>    </div>    <div class="DV-annotationBody DV-editHidden">      <%= text %>    </div>    <textarea class="DV-annotationTextArea DV-editVisible" style="width: <%= bWidth %>px;"><%= text %></textarea>    <div class="DV-annotationEditControls DV-editVisible">      <div class="<%= access == \'public\' ? \'DV-ownerVisible\' : \'DV-contributorVisible\' %> clearfix">        <div class="minibutton warn DV-deleteAnnotation float_left">Delete</div>        <div class="minibutton default DV-saveAnnotation float_right">Save</div>        <div class="minibutton DV-cancelEdit float_right">Cancel</div>      </div>    </div>  </div></div>');window.JST.annotationNav=_.template('<div class="DV-annotationMarker" id="DV-annotationMarker-<%= id %>">  <span class="DV-trigger">    <%= title %>    <span>p.<%= page %></span>  </span></div>');window.JST.chapterNav=_.template('<div id="DV-chapter-<%= id %>" class="DV-chapter <%= navigationExpanderClass %>">  <div class="DV-first">    <%= navigationExpander %>    <span class="DV-trigger"><%= title %><span>p.&nbsp;<%= pageNumber %></span></span>  </div>  <%= noteViews %></div>');window.JST.descriptionContainer=_.template('<% if (description) { %>  <div class="DV-description">    <div class="DV-descriptionHead">      <span class="DV-descriptionToggle DV-showDescription DV-trigger"> Toggle Description</span>      Description    </div>    <div class="DV-descriptionText"><%= description %></div>  </div><% } %>');window.JST.footer=_.template('<% if (!options.sidebar) { %>  <div class="DV-footer">    <div class="DV-fullscreenContainer"></div>    <div class="DV-navControlsContainer"></div>  </div><% } %>');window.JST.fullscreenControl=_.template('<div class="DV-fullscreen" title="View Document in Fullscreen"></div>');window.JST.header=_.template('<div class="DV-header">  <div class="DV-headerHat" class="clearfix">    <div class="DV-branding">      <% if (story_url) { %>        <span class="DV-storyLink"><%= story_url %></span>      <% } %>    </div>    <div class="DV-title">      <%= title %>    </div>  </div>  <div class="DV-controls">    <div class="DV-views">      <div class="DV-documentView DV-first"><span class="DV-trigger DV-selected">Document</span></div>      <div style="display:none;" class="DV-annotationView"><span class="DV-trigger">Notes</span></div>      <div class="DV-textView DV-last"><span class="DV-trigger">Text</span></div>    </div>    <div class="DV-searchBox clearfix">      <form action="#" method="get" class="DV-searchDocument">        <div class="DV-searchInputWrap">          <div class="DV-searchInput-cancel"></div>          <input class="DV-searchInput" type="text" autosave="DV-<%= id %>" results="10" placeholder="Search" />        </div>      </form>    </div>    <div class="DV-zoomControls">      <span class="DV-zoomLabel">Zoom</span>      <div class="DV-zoomBox"></div>    </div>  </div></div>');window.JST.navControls=_.template('<div class="DV-navControls clearfix">  <span class="DV-trigger DV-previous">&laquo;</span>  <div class="clearfix DV-pageNumberContainer">    <span class="DV-currentPagePrefix">Page</span>    <span class="DV-currentAnnotationPrefix">Annot.&nbsp;</span>    <span class="DV-currentPage">1</span>    <span class="DV-currentPageSuffix">of&nbsp;      <span class="DV-totalPages"><%= totalPages %></span>      <span class="DV-totalAnnotations"><%= totalAnnotations %></span>                            </span>  </div>  <span class="DV-trigger DV-next">&raquo;</span></div>');window.JST.navigationExpander=_.template('<span class="DV-trigger DV-expander">Expand</span>');window.JST.pageAnnotation=_.template('<div class="DV-annotation DV-pageNote <%= orderClass %> DV-<%= access %>" style="top:<%= top %>px;" id="DV-annotation-<%= id %>">  <div class="DV-annotationTab">    <div class="DV-annotationClose DV-trigger">p. <%= pageNumber %></div>  </div>  <div class="DV-annotationContent">        <!-- Header -->    <div class="DV-annotationHeader clearfix">      <div class="DV-pagination DV-editHidden">        <span class="DV-trigger DV-annotationPrevious" title="Previous Annotation">Previous</span>        <span class="DV-trigger DV-annotationNext" title="Next Annotation">Next</span>      </div>            <div class="DV-annotationGoto DV-editHidden"><div class="DV-trigger">p. <%= pageNumber %></div></div>      <div class="DV-annotationTitle DV-editHidden"><%= title %></div>      <input class="DV-annotationTitleInput DV-editVisible" type="text" placeholder="Annotation Title" value="<%= title %>" />      <% if (access == \'private\') { %>        <div class="DV-privateLock DV-editHidden" title="Private note"></div>      <% } %>      <div class="DV-showEdit DV-editHidden <%= access == \'public\' ? \'DV-ownerVisible\' : \'DV-contributorVisible\' %>"></div>    </div>    <div class="DV-annotationBody DV-editHidden">      <%= text %>    </div>    <textarea class="DV-annotationTextArea DV-editVisible" style="width: <%= bWidth %>px;"><%= text %></textarea>    <div class="DV-annotationEditControls DV-editVisible">      <div class="<%= access == \'public\' ? \'DV-ownerVisible\' : \'DV-contributorVisible\' %> clearfix">        <div class="minibutton warn DV-deleteAnnotation float_left">Delete</div>        <div class="minibutton default DV-saveAnnotation float_right">Save</div>        <div class="minibutton DV-cancelEdit float_right">Cancel</div>      </div>    </div>  </div></div>');window.JST.pages=_.template('<div class="DV-set p<%= pageIndex %>" data-id="p<%= pageIndex %>" style="top:0;left:0px;height:893px;width:700px;">  <div class="DV-removeOverlay"></div>  <div class="DV-pageNoteInsert" title="Click to Add a Page Note">    <div class="DV-annotationTab">      <div class="DV-annotationClose"></div>    </div>    <div class="DV-annotationDivider"></div>  </div>  <div class="DV-pageMeta"><span class="DV-pageNumber">p. <%= pageNumber %></span></div>  <div class="DV-annotations"></div>  <div class="DV-page" style="height:863px;width:700px;">    <span class="DV-loading-top">Loading</span>    <span class="DV-loading-bottom">Loading</span>    <div class="DV-cover"></div>    <img class="DV-pageImage" src="<%= pageImageSource %>" height="863" />  </div></div>');window.JST.unsupported=_.template('<div class="DV-unsupported">  <div class="DV-intro">    <% if (viewer.schema.document.resources && viewer.schema.document.resources.pdf) { %>      <a href="<%= viewer.schema.document.resources.pdf %>">Download this document as a PDF</a>    <% } %>    <br />    <br />    To use the Document Viewer you need to<br /> upgrade your browser:  </div>  <div class="DV-browsers">    <div class="DV-browser">      <a href="http://www.google.com/chrome">        <div class="DV-image DV-chrome"> </div>Chrome      </a>    </div>    <div class="DV-browser">      <a href="http://www.apple.com/safari/download/">        <div class="DV-image DV-safari"> </div>Safari      </a>    </div>    <div class="DV-browser">      <a href="http://www.mozilla.com/en-US/firefox/firefox.html">        <div class="DV-image DV-firefox"> </div>Firefox      </a>    </div>    <br style="clear:both;" />  </div>  <div class="DV-after">    Or, if you\'d like to continue using Internet Explorer 6,<br /> you can    <a href="http://www.google.com/chromeframe">install Google Chrome Frame</a>.  </div></div>');window.JST.viewer=_.template('<!--[if IE 7]><div class="DV-docViewer clearfix DV-viewDocument DV-ie DV-ie7 <% if (autoZoom) { %>DV-autoZoom<% } %> <% if (!options.sidebar) { %>DV-hideSidebar<% } %>"><![endif]--><!--[if IE 8]><div class="DV-docViewer clearfix DV-viewDocument DV-ie DV-ie8 <% if (autoZoom) { %>DV-autoZoom<% } %> <% if (!options.sidebar) { %>DV-hideSidebar<% } %>"><![endif]--><!--[if !IE]><!--><div class="DV-docViewer clearfix DV-viewDocument <% if (autoZoom) { %>DV-autoZoom<% } %> <% if (!options.sidebar) { %>DV-hideSidebar<% } %>"><!-- <![endif]-->  <%= header %>  <div class="DV-docViewer-Container <% if (options.sidebar) { %>DV-hide-footer<% } %>">    <div class="DV-searchBarWrapper">      <div class="DV-searchBar">        <span class="DV-trigger DV-closeSearch">CLOSE</span>        <div class="DV-searchPagination DV-foundResult">          <div class="DV-searchResults">            <span class="DV-resultPrevious DV-trigger">Previous</span>            <span class="DV-currentSearchResult"></span>            <span class="DV-totalSearchResult"></span>            <span> for &ldquo;<span class="DV-searchQuery"></span>&rdquo;</span>            <span class="DV-resultNext DV-trigger">Next</span>          </div>        </div>      </div>    </div>    <div class="DV-pages <% if (!options.sidebar) { %>DV-hide-sidebar<% } %>">      <div class="DV-pageCollection">        <div class="DV-bar" style=""></div>        <div class="DV-allAnnotations">        </div>        <div class="DV-text">          <div class="DV-textSearch clearfix">          </div>          <div class="DV-textPage">            <span class="DV-textCurrentPage"></span>            <pre class="DV-textContents"></pre>          </div>        </div>        <%= pages %>      </div>    </div>    <div width="265px" class="DV-sidebar <% if (!options.sidebar) { %>DV-hide<% } %>" style="display:none;">      <div class="DV-well">        <% if (options.sidebar) { %>          <div class="DV-navControlsContainer">          </div>        <% } %>        <div class="DV-navigation">          <%= descriptionContainer %>          <div class="DV-contentsHeader">Contents</div>          <div class="DV-chaptersContainer">          </div>          <div class="DV-supplemental">            <% if (pdf_url) { %>              <div class="DV-pdfLink"><%= pdf_url %></div>            <% } %>            <div class="DV-storyLink" style="<%= story_url ? \'\' : \'display:none\' %>">              <a target="_blank" href="<%= story_url %>">Related Article &raquo;</a>            </div>          </div>          <div class="DV-logo"><a class="DV-logoLink" href="#"></a></div>        </div>      </div>    </div>  </div>  <%= footer %></div>')})();