<?php 

/**
 * Customizer for Services section
 */
class Rundex_Services_Section_Customizer {
    public function __construct() {
        add_action( 'customize_register', array( $this, 'customizer' ) );
    }

    /**
     * Calls customizer section
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function customizer( $wp_customize ) {
        $this->services( $wp_customize );
    }

    /**
     * Handles the services section customizer objects
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function services( $wp_customize ) {
        $this->services_section( $wp_customize );
        $this->services_settings( $wp_customize );
        $this->services_control( $wp_customize );
    }

    /**
     * Services section container
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function services_section( $wp_customize ) {
        $wp_customize->add_section( 'services', array( 
            'title' => __( 'Services Section' ),
            'description' => __( 'Services section used on multiple pages such as front-page, services' ),
            'priority' => 160,
        ) );
    }

    /**
     * Services section settings
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function services_settings( $wp_customize ) {
        // Heading
        $wp_customize->add_setting( 'services-heading', array(
            'default' => 'Services Heading',
            'sanitize_callback' => 'sanitize_text_field',
        ) );

        // Sub heading
        $wp_customize->add_setting( 'services-sub-heading', array(
            'default' => 'Services Sub Heading',
            'sanitize_callback' => 'sanitize_text_field',
        ) );
    }

    /**
     * Services section control
     * 
     * @param object $wp_customize Wordpress customizer object
     * 
     * @return void
     */
    public function services_control( $wp_customize ) {
        // Heading
        $wp_customize->add_control( 'services-heading', array(
            'type' => 'input',
            'priority' => 11,
            'section' => 'services',
            'label' => __( 'Heading' ),
            'description' => __( 'Services section heading' ),
        ) );

        // Sub heading
        $wp_customize->add_control( 'services-sub-heading', array(
            'type' => 'input',
            'priority' => 11,
            'section' => 'services',
            'label' => __( 'Sub Heading' ),
            'description' => __( 'Services section sub heading' ),
        ) );
    }
}