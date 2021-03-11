<?php

use App\Http\Lumberjack;

// Create the Application Container
$app = require_once('bootstrap/app.php');

// Bootstrap Lumberjack from the Container
$lumberjack = $app->make(Lumberjack::class);
$lumberjack->bootstrap();

// Import our routes file
require_once('routes.php');

// Set global params in the Timber context
add_filter('timber_context', [$lumberjack, 'addToContext']);

add_action('wp_head', 'setup_rundex_css');
add_action('wp_footer', 'setup_rundex_js');


function setup_rundex_css() {
    wp_register_style('rundex-css', 
        get_template_directory_uri() . '/assets/dist/css/theme.min.css',
        [], null, 'all'
    );
    wp_enqueue_style('rundex-css');
}

function setup_rundex_js() {
    wp_register_script('rundex-js', 
        get_template_directory_uri() . '/assets/dist/js/theme.min.js', 
        [ 'jquery' ], null, true
    );
    wp_enqueue_script('rundex-js');
}