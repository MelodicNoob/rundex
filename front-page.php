<?php

/**
 * Front page template
 * 
 * 
 */

namespace App;

use App\Http\Controllers\Controller;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;
use Timber\Timber;

class FrontPageController extends Controller {
    public function handle() {
        $context = Timber::get_context();

        $context['banner_heading'] = get_theme_mod( 'front_page_banner_heading' );
        $context['banner_sub_heading'] = get_theme_mod( 'front_page_banner_sub_heading' );

        return new TimberResponse('templates/front-page.twig', $context);
    }
}