<?php 

/**
 * Customizer for the Front Page
 */
class Rundex_Front_Page_Customizer {
    public function __construct() {
        add_action( 'customize_register', array( $this, 'customizer' ) );
    }

    /**
     * Calls customizer sections
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function customizer( $wp_customize ) {
        $this->banner( $wp_customize );
    }

    /**
     * Handles the banner customizer objects
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function banner( $wp_customize ) {
        $this->banner_section( $wp_customize );
        $this->banner_settings( $wp_customize );
        $this->banner_control( $wp_customize );
    }

    /**
     * Banner section container
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function banner_section( $wp_customize ) {
        $wp_customize->add_section( 'front_page_banner', array(
            'title' => __( 'Front Page | Banner' ),
            'description' => __( 'Add front page banner' ),
            'priority' => 160,
        ) );
    }

    /** 
     * Banner section settings 
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function banner_settings( $wp_customize ) {
        // Heading
        $wp_customize->add_setting( 'front_page_banner_heading', array(
            'default' => 'Front Page Heading',
            'sanitize_callback' => 'sanitize_text_field',
        ) );

        // Sub heading
        $wp_customize->add_setting( 'front_page_banner_sub_heading', array(
            'default' => 'Front Page Sub Heading',
            'sanitize_callback' => 'sanitize_text_field',
        ) );
    }

    /**
     * Banner section control
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function banner_control( $wp_customize ) {
        // Heading
        $wp_customize->add_control( 'front_page_banner_heading', array(
            'type' => 'input',
            'priority' => 10,
            'section' => 'front_page_banner',
            'label' => __( 'Heading' ),
            'description' => __( 'Front page banner heading' ),
            'active_callback' => 'is_front_page',
        ) );

        // Sub heading
        $wp_customize->add_control( 'front_page_banner_sub_heading', array(
            'type' => 'input',
            'priority' => 11,
            'section' => 'front_page_banner',
            'label' => __( 'Sub Heading' ),
            'description' => __( 'Front page banner sub heading' ),
            'active_callback' => 'is_front_page',
        ) );
    }
}