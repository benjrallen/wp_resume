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

<div id="contentTop" class="fp">
	<div class="bgNoise"></div>
	<div class="wrap">
		<?php get_template_part('front-page', 'rotator'); ?>
	</div>
</div>

<div class="wrap">

	<article id="front-page-entry" <?php post_class(); ?>>
	
	<?php if ( have_posts() ) : while( have_posts() ) : the_post(); ?>
	
		<div class="entry-content">			
			<div class="entry-teaser">
				<?php 
					global $more;
					$more = 0;
					//$readMore = '<a href="'.get_permalink().'" class="base bttn page-read-more" title="Read More">Read More</a>';
					$readMore = 'Read More';
					the_content($readMore);
				?>
			</div>
			<div class="entry-full">
				<?php 
					$more = 1;
					the_content('', true);
				?>
				
			</div>
			
			<div class="clearfix"></div>
		</div><!-- .entry-content -->
	
	<?php endwhile; endif; ?>
	<div class="clearfix"></div>
	
	</article>

	<?php get_template_part('front-page', 'sidebar'); ?>
	
</div>

	<div class="clearfix"></div>


<?php get_footer(); ?>