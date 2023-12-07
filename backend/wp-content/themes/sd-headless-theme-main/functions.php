<?php
/**
 * Theme functionality.
 *
 * @author SaigonDigital
 * @package sd-headless-theme
 * @since 1.0.0
 */

// Theme functionality here.
include_once( get_stylesheet_directory() .'/functions/misc-functions.php'); // include first
include_once( get_stylesheet_directory() .'/functions/acf-blocks.php');
include_once( get_stylesheet_directory() .'/functions/acf-options.php');
include_once( get_stylesheet_directory() .'/functions/gutenberg-blocks.php');
include_once( get_stylesheet_directory() .'/functions/wp-menus.php');

add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size( 1568, 9999 );


// Theme blocks here.
// include_once( get_stylesheet_directory() .'/functions/gutenberg-blocks.php');



