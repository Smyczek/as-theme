import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, SelectControl } from '@wordpress/components';
import { icons } from 'lucide-react';
import { createElement } from '@wordpress/element';

const LucideIcon = ( { name, size = 24 } ) => {
	const pascalName = name.split( '-' ).map( s => s.charAt( 0 ).toUpperCase() + s.slice( 1 ) ).join( '' );
	const Icon = icons[ pascalName ];
	return Icon ? createElement( Icon, { size } ) : null;
};

export default function Edit( { attributes, setAttributes } ) {
	const { tag, heading, cards } = attributes;
	const blockProps = useBlockProps( { className: 'services' } );

	const updateCard = ( idx, field, value ) => {
		const updated = [ ...cards ];
		updated[ idx ] = { ...updated[ idx ], [ field ]: value };
		setAttributes( { cards: updated } );
	};

	const updateItem = ( cardIdx, itemIdx, value ) => {
		const updated = [ ...cards ];
		const items = [ ...updated[ cardIdx ].items ];
		items[ itemIdx ] = value;
		updated[ cardIdx ] = { ...updated[ cardIdx ], items };
		setAttributes( { cards: updated } );
	};

	const addItem = ( cardIdx ) => {
		const updated = [ ...cards ];
		updated[ cardIdx ] = { ...updated[ cardIdx ], items: [ ...updated[ cardIdx ].items, 'New Item' ] };
		setAttributes( { cards: updated } );
	};

	const removeItem = ( cardIdx, itemIdx ) => {
		const updated = [ ...cards ];
		updated[ cardIdx ] = { ...updated[ cardIdx ], items: updated[ cardIdx ].items.filter( ( _, i ) => i !== itemIdx ) };
		setAttributes( { cards: updated } );
	};

	return (
		<>
			<InspectorControls>
				{ cards.map( ( card, ci ) => (
					<PanelBody key={ ci } title={ card.title || 'Card' } initialOpen={ false }>
						<TextControl
							label={ __( 'Icon (Lucide name)', 'as-theme' ) }
							help={ __( 'e.g. palette, code-2, rocket', 'as-theme' ) }
							value={ card.icon }
							onChange={ ( val ) => updateCard( ci, 'icon', val ) }
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Price', 'as-theme' ) }
							value={ card.price }
							onChange={ ( val ) => updateCard( ci, 'price', val ) }
						/>
						<TextControl
							label={ __( 'Link Text', 'as-theme' ) }
							value={ card.linkText }
							onChange={ ( val ) => updateCard( ci, 'linkText', val ) }
						/>
						<TextControl
							label={ __( 'Link URL', 'as-theme' ) }
							value={ card.linkUrl }
							onChange={ ( val ) => updateCard( ci, 'linkUrl', val ) }
						/>
						<hr />
						<p><strong>{ __( 'Services List', 'as-theme' ) }</strong></p>
						{ card.items.map( ( item, ii ) => (
							<div key={ ii } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
								<TextControl
									value={ item }
									onChange={ ( val ) => updateItem( ci, ii, val ) }
									style={ { flex: 1, marginBottom: 0 } }
								/>
								<Button isDestructive variant="link" onClick={ () => removeItem( ci, ii ) }>✕</Button>
							</div>
						) ) }
						<Button variant="secondary" onClick={ () => addItem( ci ) }>
							{ __( 'Add Service', 'as-theme' ) }
						</Button>
					</PanelBody>
				) ) }
			</InspectorControls>

			<div { ...blockProps } id="services">
				<div className="container">
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
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
						allowedFormats={ [ 'core/bold' ] }
					/>
					<div className="svc-grid">
						{ cards.map( ( card, ci ) => (
							<div key={ ci } className="svc-card">
								<div className="svc-icon"><LucideIcon name={ card.icon } /></div>
								<RichText
									tagName="h3"
									value={ card.title }
									onChange={ ( val ) => updateCard( ci, 'title', val ) }
									allowedFormats={ [] }
								/>
								<ul>
									{ card.items.map( ( item, ii ) => (
										<li key={ ii }>{ item }</li>
									) ) }
								</ul>
								<div className="svc-price">{ card.price }</div>
								<a className="svc-link">{ card.linkText } →</a>
							</div>
						) ) }
					</div>
				</div>
			</div>
		</>
	);
}
