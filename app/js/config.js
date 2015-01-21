define(function() {
	var config = {};
	config.localApiUrl = '/movies';
	config.markerColor = 'video';

	_.templateSettings = {
	  evaluate    : /\{\{([\s\S]+?)\}\}/g,
	  interpolate : /\{\{=([\s\S]+?)\}\}/g,
	  escape      : /\{\{-([\s\S]+?)\}\}/g
	};

	return config;
});