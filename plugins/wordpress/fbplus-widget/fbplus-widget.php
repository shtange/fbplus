<?php

/*
 * Plugin Name: FbPlus Widget
 * Plugin URI:  https://github.com/shtange/fbplus
 * Description: Alternative facebook badge for pages.
 * Version:     1.0
 * Author:      Yurii Shtanhei
 * Author URI:  http://www.shtange.com
 * License:     GPL-2.0+
 * Copyright:   2015 Yurii Shtanhei
 *
 */

class FbPlusWidget extends WP_Widget {

    /**
     * Widget construction
     */
    function __construct() {

        parent::__construct('FbPlusWidget', __('FbPlus Widget', 'fbplus'), array('classname' => 'fbplus-widget', 'description' => __('alternative facebook badge', 'fbplus')), array('width' => 400));

        $this->define_constants();
        $this->setup_actions();

    }

    /**
     * Define FbPlus constants
     */
    private function define_constants() {

        define( 'FBPLUS_BASE_URL',   trailingslashit( plugins_url( 'fbplus-widget' ) ) );
        define( 'FBPLUS_ASSETS_URL', trailingslashit( FBPLUS_BASE_URL . 'assets' ) );
        define( 'FBPLUS_PATH',       plugin_dir_path( __FILE__ ) );

    }

    /**
     * Hook FbPlus into WordPress
     */
    private function setup_actions() {

        add_action('wp_head', array( &$this, 'addWidgetStyles' ) );

    }

    /**
     * Setup the widget output
     */
    function widget( $args, $instance ) {

        $args['widget_id'] = (!empty($args['widget_id'])) ? $args['widget_id'] : null;
        extract($args);

        $output =   '<div id="FBplusBadge" data-width="' . $instance['width'] . '" data-href="https://facebook.com/' . $instance['fbpage'] . '" data-rel="page" data-theme="' . $instance['theme'] . '" data-lang="' . $instance['lang'] . '"></div>' .
                    '<script type="text/javascript">' .
                        '(function() {' .
                        'var po = document.createElement("script"); po.type = "text/javascript"; po.async = true;' .
                        'po.src = "' . FBPLUS_ASSETS_URL . 'fbplus.badge.js";' .
                        'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);' .
                        '})();' .
                    '</script>';

        print (!empty($instance['fbpage'])) ? $output : '';

    }

    /**
     *  Custom styles
     */
    function addWidgetStyles(){

        wp_enqueue_style( 'fbplus-style', FBPLUS_ASSETS_URL . 'fbplus.badge.css' );

    }

    /**
     * Run on widget update
     */
    function update( $new_instance, $old_instance ) {

        $instance = $old_instance;
        $instance['fbpage'] = strip_tags($new_instance['fbpage']);
        $instance['width'] = strip_tags($new_instance['width']);
        $instance['theme'] = (!empty($new_instance['theme'])) ? $new_instance['theme'] : 'light';
        $instance['lang'] = (!empty($new_instance['lang'])) ? $new_instance['lang'] : 'en';

        // var_dump($instance); die();

        return $instance;
    }

    /**
     * Setup the widget admin form
     */
    function form( $instance ) {
        $defval = array(
            'fbpage' => '',
            'width' => 240,
            'theme' => 'light',
            'lang' => ''
        );
        $instance = wp_parse_args( (array) $instance, $defval);
        $fbpage = $instance['fbpage'];
        $width = (int)$instance['width'];
        $theme = $instance['theme'];
        $lang = $instance['lang'];

        $languages = array(
            'en' => 'English',
            'de' => 'German',
            'fr' => 'French',
            'it' => 'Italian',
            'es' => 'Spanish',
            'pt' => 'Portuguese',
            'ru' => 'Russian',
            'ua' => 'Ukrainian',
        );

?>

        <p>
            <!-- <label><?php _e('facebook page', 'fbplus'); ?>:</label> -->
            www.facebook.com/<input type="text" id="<?php echo $this->get_field_id('fbpage'); ?>" name="<?php echo $this->get_field_name('fbpage'); ?>" value="<?php echo $fbpage; ?>" placeholder="page name" autocomplete="off">
        </p>

        <p>
            <label><?php _e('width', 'fbplus'); ?>:</label>
            <input type="text" id="<?php echo $this->get_field_id('width'); ?>" name="<?php echo $this->get_field_name('width'); ?>" value="<?php echo $width; ?>" size="3" maxlength="3" autocomplete="off"> px
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('theme'); ?>"><?php _e('theme', 'fbplus'); ?>:&nbsp;&nbsp;</label>
            <input id="<?php echo $this->get_field_id('radioLight'); ?>" name="<?php echo $this->get_field_name('theme'); ?>" type="radio" value="light" <?php print (!empty($instance['theme']) && $instance['theme'] == 'light') ? 'checked' : ''; ?> /><label for="<?php echo $this->get_field_id('radioLight'); ?>"><span style="padding: 0 4px;"><?php _e('light', 'fbplus'); ?></span></label>&nbsp;
            <input id="<?php echo $this->get_field_id('radioDark'); ?>" name="<?php echo $this->get_field_name('theme'); ?>" type="radio" value="dark" <?php print (!empty($instance['theme']) && $instance['theme'] == 'dark') ? 'checked' : ''; ?> /><label for="<?php echo $this->get_field_id('radioDark'); ?>"><span style="padding: 0 4px;"><?php _e('dark', 'fbplus'); ?></span></label>&nbsp;
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('lang'); ?>"><?php _e('language', 'fbplus'); ?>:</label>
            <select id="<?php echo $this->get_field_id('lang'); ?>" name="<?php echo $this->get_field_name('lang'); ?>">
                <?php foreach($languages as $abbr=>$name): ?>
                    <option value="<?php print $abbr; ?>" <?php print (!empty($lang) && $lang == $abbr) ? 'selected' : ''; ?>><?php print $name; ?></option>
                <?php endforeach; ?>
            </select>
        </p>

        <p><hr></p>

<?php
    }

}

/**
 * Register the widget
 */
function fbplus_widget_init() {
    register_widget('FbPlusWidget');
}
add_action('widgets_init', 'fbplus_widget_init');
