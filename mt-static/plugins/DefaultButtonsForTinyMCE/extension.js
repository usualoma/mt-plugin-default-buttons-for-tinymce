(function($) {

var config                 = MT.Editor.TinyMCE.config;
var setup                  = config.setup || function(){};
var init_instance_callback = config.init_instance_callback;

$.extend(config, {
    setup: function(ed) {
        setup.apply(this, arguments);

        ed.onBeforeRenderUI.add(function() {
            tinyMCE.DOM.loadCSS(StaticURI + 'plugins/TinyMCE/tiny_mce/themes/advanced/skins/default/ui.css');
        });
    },

    init_instance_callback: function(ed) {
        init_instance_callback.apply(this, arguments);

        var count = 0;
        var intervalID = setInterval(function() {
            if (count++ >= 20) {
                clearInterval(intervalID);
            }

            $(ed.getContainer()).find('.mceIcon').each(function() {
                var $icon = $(this);
                var image = $icon.css('background-image') || '';
                if (! image || image == 'none') {
                    return;
                }

                if (image.search(/advanced\/skins\/mt\/img\/icons.png/) != -1) {
                    if (intervalID) {
                        clearInterval(intervalID);
                        intervalID = null;
                    }

                    var position = $icon.css('background-position');
                    if (! position) {
                        position =
                            $icon.css('background-position-x') + ' ' +
                            $icon.css('background-position-y');
                    }

                    if (position.search(/px/) == -1) {
                        $icon.parent().wrap('<span class="defaultSkin" />');
                    }
                }
            });
        }, 100);
    }
});

})(jQuery);
