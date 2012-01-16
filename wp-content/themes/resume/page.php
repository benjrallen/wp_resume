<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the wordpress construct of pages
 * and that other 'pages' on your wordpress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>


<div id="contentTop" class="fp">
	<div class="bgNoise"></div>
	<div class="wrap">
		<h1 class="entry-title"><?php the_title(); ?></h1>
	</div>
</div>


	
	<?php
	/*
		if ($post->post_parent)	{
			$ancestors=get_post_ancestors($post->ID);
			$root=count($ancestors)-1;
			$parent = $ancestors[$root];
		} else {
			$parent = $post->ID;
		}
		
		$parentTitle = get_the_title( $parent );
		$parentURL = get_permalink( $parent );
		$parentSubtitle = get_post_meta($parent, 'tcf_page_subtitle', true);
	*/
	?>
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
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
<?php /* ?>
		<header class="parent-title">
			<?php get_template_part('share', 'buttons'); ?>
			<?php echo '<h3><a href="'.$parentURL.'" title="'.$parentTitle.'">'.$parentTitle.'</a></h3>'; ?>
			<?php if ($parentSubtitle && $parentSubtitle != '') { ?>
			<h4><?php echo $parentSubtitle; ?></h4>
			<?php } ?>
		</header>
		<div class="entry-content">
			<?php
				if( has_post_thumbnail() ){														
					$thumbID = get_post_thumbnail_id($post->ID);
					$thumbTitle = get_the_title( $thumbID );
					$thumbSrc = wp_get_attachment_image_src( $thumbID, 'page-thumb' );
					$banner = array(
						'url' => $thumbSrc[0],
						'width' => $thumbSrc[1],
						'height' => $thumbSrc[2]
						
					);
										
					echo '<div class="pic">';
						echo '<img src="'.$banner['url'].'" width="'.$banner['width'].'" height="'.$banner['height'].'" />';
						// echo '<div><span>'.$thumbTitle.'</span></div>';
					echo '</div>';
				}
			?>

			
			<?php if ($parent != $post->ID) { ?>
				<h1 class="entry-title"><?php the_title(); ?></h1>
			<?php } ?>
			<div class="entry-teaser">
				<?php 
					global $more;
					$more = 0;
					$readMore = '<a href="'.get_permalink().'" class="base bttn page-read-more" title="Read More">Read More</a>';
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
<?php */ ?>
	</article><!-- #post-## -->
<?php endwhile; endif; ?>
<?php get_sidebar(); ?>
<div class="clearfix"></div>
<?php get_footer(); ?>