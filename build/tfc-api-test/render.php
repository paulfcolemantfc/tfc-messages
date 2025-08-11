<?php
//function messagebuilder($atts) 
//{
	// Define the taxonomy you want to retrieve terms from
	$taxonomy = 'type-message';
	$taxfilter = 'Sermon';
	if (array_key_exists('taxfilter', $_GET)) {
		$taxfilter = $_GET['taxfilter']; // Gets filter query string
	}

// Get all terms from the taxonomy
$terms = get_terms(array(
    'taxonomy' => $taxonomy,
	'hide_empty' => false, // Set to true if you only want terms with posts
));
	//return $taxfilter;
	$html='<form id="taxfilter-frm">';
	$html =$html.'<div class="type-selector"><label for="message-type">Type:</label>';
	
	if (!empty($terms) && !is_wp_error($terms)) {
    	foreach ($terms as $term) {
	
        	// Get the ACF field value for the term
        	//$acf_field_value = get_field('type', $term);
		
        	// Output the term name and ACF field value
        	// select $taxfilter
        	
        	if ($term->name == $taxfilter){
				$taxid=$term->term_id;
				$taxslug=$term->slug;
				$html = $html.'<input type="radio" name="message-type" value="'.$term->term_id.'" checked>'.$term->name;
		
		}
		else{
			$html = $html.'<input type="radio" name="message-type" value="'.$term->term_id.' ">'.$term->name;
			
		}
    
       
    }
	} else {
    	$html = $html. 'No terms found.';
	}
	$html = $html.'</form>';

echo $html;
//}
//add_shortcode('getmessages', 'messagebuilder');
?>





<div class="main">
	<input type=test>

		<div class="results">
		
		</div>
	</div>