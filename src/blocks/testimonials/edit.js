import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, RangeControl, Button } from '@wordpress/components';
import { icons } from 'lucide-react';
import { createElement } from '@wordpress/element';

const LucideIcon = ( { name, size = 24 } ) => {
	const pascalName = name.split( '-' ).map( s => s.charAt( 0 ).toUpperCase() + s.slice( 1 ) ).join( '' );
	const Icon = icons[ pascalName ];
	return Icon ? createElement( Icon, { size } ) : null;
};

export default function Edit( { attributes, setAttributes } ) {
	const { tag, heading, testimonials, proofItems } = attributes;
	const blockProps = useBlockProps( { className: 'testimonials' } );

	const updateTestimonial = ( idx, field, value ) => {
		const updated = [ ...testimonials ];
		updated[ idx ] = { ...updated[ idx ], [ field ]: value };
		setAttributes( { testimonials: updated } );
	};

	const addTestimonial = () => {
		setAttributes( { testimonials: [ ...testimonials, { text: 'New testimonial...', author: 'Client Name', url: '#', stars: 5 } ] } );
	};

	const removeTestimonial = ( idx ) => {
		setAttributes( { testimonials: testimonials.filter( ( _, i ) => i !== idx ) } );
	};

	const updateProof = ( idx, field, value ) => {
		const updated = [ ...proofItems ];
		updated[ idx ] = { ...updated[ idx ], [ field ]: value };
		setAttributes( { proofItems: updated } );
	};

	const moveTestimonial = ( idx, direction ) => {
		const updated = [ ...testimonials ];
		const targetIdx = idx + direction;
		if ( targetIdx < 0 || targetIdx >= updated.length ) return;
		[ updated[ idx ], updated[ targetIdx ] ] = [ updated[ targetIdx ], updated[ idx ] ];
		setAttributes( { testimonials: updated } );
	};

	const stars = ( count ) => '★'.repeat( count ) + '☆'.repeat( 5 - count );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Section', 'as-theme' ) }>
					<TextControl
						label={ __( 'Tag', 'as-theme' ) }
						value={ tag }
						onChange={ ( val ) => setAttributes( { tag: val } ) }
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Heading', 'as-theme' ) }
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title={ __( 'Testimonials', 'as-theme' ) + ` (${ testimonials.length })` } initialOpen={ false }>
					{ testimonials.map( ( t, i ) => (
						<div key={ i } style={ { marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e0e0e0' } }>
							<p style={ { fontWeight: 600, fontSize: '12px', color: '#757575', marginBottom: '8px' } }>
								{ `#${ i + 1 }` }
							</p>
							<TextareaControl
								label={ __( 'Quote', 'as-theme' ) }
								value={ t.text }
								onChange={ ( val ) => updateTestimonial( i, 'text', val ) }
							/>
							<TextControl
								label={ __( 'Author', 'as-theme' ) }
								value={ t.author }
								onChange={ ( val ) => updateTestimonial( i, 'author', val ) }
								__nextHasNoMarginBottom
							/>
							<TextControl
								label={ __( 'URL', 'as-theme' ) }
								value={ t.url }
								onChange={ ( val ) => updateTestimonial( i, 'url', val ) }
								__nextHasNoMarginBottom
							/>
							<RangeControl
								label={ __( 'Stars', 'as-theme' ) }
								value={ t.stars }
								onChange={ ( val ) => updateTestimonial( i, 'stars', val ) }
								min={ 1 }
								max={ 5 }
							/>
							<div style={ { display: 'flex', gap: '4px', alignItems: 'center' } }>
								<Button variant="tertiary" size="small" onClick={ () => moveTestimonial( i, -1 ) } disabled={ i === 0 }>↑</Button>
								<Button variant="tertiary" size="small" onClick={ () => moveTestimonial( i, 1 ) } disabled={ i === testimonials.length - 1 }>↓</Button>
								<Button isDestructive variant="link" size="small" onClick={ () => removeTestimonial( i ) }>
									{ __( 'Remove', 'as-theme' ) }
								</Button>
							</div>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addTestimonial }>
						{ __( 'Add Testimonial', 'as-theme' ) }
					</Button>
				</PanelBody>
				<PanelBody title={ __( 'Proof Badges', 'as-theme' ) } initialOpen={ false }>
					{ proofItems.map( ( p, i ) => (
						<div key={ i } style={ { marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' } }>
							<TextControl
								label={ __( 'Label', 'as-theme' ) }
								value={ p.label }
								onChange={ ( val ) => updateProof( i, 'label', val ) }
								__nextHasNoMarginBottom
							/>
							<TextControl
								label={ __( 'Icon (Lucide name)', 'as-theme' ) }
								value={ p.icon }
								onChange={ ( val ) => updateProof( i, 'icon', val ) }
								__nextHasNoMarginBottom
							/>
						</div>
					) ) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="container">
					<div className="test-top-row">
						<div>
							<RichText
								tagName="span"
								className="tag"
								value={ tag }
								onChange={ ( val ) => setAttributes( { tag: val } ) }
								allowedFormats={ [] }
							/>
							<RichText
								tagName="h2"
								className="section-heading"
								style={ { marginBottom: 0 } }
								value={ heading }
								onChange={ ( val ) => setAttributes( { heading: val } ) }
								allowedFormats={ [] }
							/>
						</div>
						<div className="test-arrows">
							<div className="test-arrow">
								<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
							</div>
							<div className="test-arrow">
								<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
							</div>
						</div>
					</div>
					<div style={ { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '16px' } }>
						{ testimonials.slice( 0, 3 ).map( ( t, i ) => (
							<div key={ i } className="test-card">
								<div className="test-mark">&ldquo;</div>
								<p className="test-text">{ t.text }</p>
								<div className="test-author">{ t.author }</div>
								<div className="test-stars">{ stars( t.stars ) }</div>
							</div>
						) ) }
					</div>
					{ testimonials.length > 3 && (
						<p style={ { textAlign: 'center', color: '#8b8e9c', fontSize: '0.82rem', marginTop: '12px' } }>
							+ { testimonials.length - 3 } more testimonials (visible in Swiper on frontend)
						</p>
					) }
					<div className="proof-row">
						{ proofItems.map( ( p, i ) => (
							<div key={ i } className="proof-item">
								<div className="proof-icon"><LucideIcon name={ p.icon } /></div>
								<div className="proof-label">{ p.label }</div>
							</div>
						) ) }
					</div>
				</div>
			</div>
		</>
	);
}
