$(document).ready(function() {
	$('.tree-toggle').click(function () {
	$(this).parent().children('ul.tree').toggle(200);
	});
	
	$("abbr.timeago").timeago();
});
        