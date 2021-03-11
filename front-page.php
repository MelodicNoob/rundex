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

        return new TimberResponse('templates/front-page.twig', $context);
    }
}