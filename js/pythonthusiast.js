$(document).ready(function() {
	$('.tree-toggle').click(function () {
	$(this).parent().children('ul.tree').toggle(200);
	});
	
	$("abbr.timeago").timeago();
	$("#toc").tocify({ selectors: "h1, h2, h3, h4", showEffect: "fadeIn"}).data("toc-tocify");
});
        