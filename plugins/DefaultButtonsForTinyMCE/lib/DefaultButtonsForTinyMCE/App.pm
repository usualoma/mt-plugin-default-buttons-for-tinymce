package DefaultButtonsForTinyMCE::App;

use strict;
use warnings;

use MT::Util;

sub template_param_cfg_plugin {
    my ( $cb, $app, $param, $tmpl ) = @_;

    $app->setup_editor_param($param);
    my $header_include
        = ( $tmpl->getElementsByName('include/header.tmpl') || [] )->[0];
    my $editor_script
        = ( $tmpl->getElementsByName('editor_script_include') || [] )->[0];
    if ( !$editor_script && $header_include ) {
        $editor_script = $tmpl->createElement(
            'include',
            {   name => 'include/editor_script.tmpl',
                id   => 'editor_script_include',
            }
        );
        $tmpl->insertBefore( $editor_script, $header_include );
    }
}

sub template_source_extension {
    my ( $cb, $app, $tmpl ) = @_;
    my $plugin = $app->component('DefaultButtonsForTinyMCE');

    my $hash = $plugin->get_config_hash;

    return unless delete $hash->{overwrite_config};

    $$tmpl .= <<__HTML__;
<mt:setvarblock name="js_include" append="1">
<script type="text/javascript">
jQuery.extend(MT.Editor.TinyMCE.config, @{[ MT::Util::to_json($hash) ]});
</script>
</mt:setvarblock>
__HTML__
}

1;
