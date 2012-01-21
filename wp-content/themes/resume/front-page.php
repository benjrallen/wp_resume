<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query. 
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header(); ?>

			<?php
			/* Run the loop to output the posts.
			 * If you want to overload this in a child theme then include a file
			 * called loop-index.php and that will be used instead.
			 */
			 //get_template_part( 'loop', 'index' );
			?>

<?php /* Sidebar before rotator on owasso */ ?>

<?php /* ?>
<div id="contentTop" class="fp">
	<div class="bgNoise"></div>
	<div class="wrap">
		<?php get_template_part('front-page', 'rotator'); ?>
	</div>
</div>
<?php */ ?>

<div class="wrap">

	<article id="front-page-entry" <?php post_class(); ?>>
	
	<?php if ( have_posts() ) : while( have_posts() ) : the_post(); ?>

	  <?php
	    if ( has_post_thumbnail() ){
	      //print_r( get_the_post_thumbnail( $post->ID, 'page-thumb' ) );
	      echo '<div class="fpPic">'.get_the_post_thumbnail( $post->ID, 'thumbnail' ).'</div>';
	    }
	  ?>
	  
		<div class="entry-content">
    	  
			  <h2 class="page-title"><?php the_title(); ?></h2>

				<?php 
      		$subtitle = get_post_meta( $post->ID, 'page_subtitle', true );
					
					if( $subtitle )
						echo '<h3 class="subtitle">'.$subtitle.'</h3>';
										
					the_content('');
				?>
				
				<div id="fpMenu">
  				<?php wp_nav_menu( array( 'theme_location' => 'front_page_menu' ) ); ?>
				</div>
				  
			<div class="clearfix"></div>
		</div><!-- .entry-content -->

	  <?php
	    //if ( has_post_thumbnail() ){
	      //print_r( get_the_post_thumbnail( $post->ID, 'page-thumb' ) );
	      //echo '<div class="pic">'.get_the_post_thumbnail( $post->ID, 'page-thumb' ).'</div>';
	    //}

      //print_r( ba_get_resume_href() );
	  ?>
	  
	  <div class="callOut">
	    <div class="arrow big"></div>
	    <div class="resumeBlock">
	      <a title="Get that resume." href="<?php echo ba_get_resume_href(); ?>" target="_blank">
	       <span class="line2">Resume</span>
	      </a>
	    </div>
	  </div>
	  
	<?php endwhile; endif; ?>
	<div class="clearfix"></div>
	
	</article>
	
</div>

	<div class="clearfix"></div>


<?php get_footer(); ?>