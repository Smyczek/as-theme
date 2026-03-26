import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { logoText, navLinks, ctaText, ctaUrl } = attributes;
	const blockProps = useBlockProps( { className: 'nav', style: { position: 'relative' } } );

	const updateLink = ( idx, field, value ) => {
		const updated = [ ...navLinks ];
		updated[ idx ] = { ...updated[ idx ], [ field ]: value };
		setAttributes( { navLinks: updated } );
	};

	const addLink = () => {
		setAttributes( { navLinks: [ ...navLinks, { label: 'New Link', url: '#' } ] } );
	};

	const removeLink = ( idx ) => {
		setAttributes( { navLinks: navLinks.filter( ( _, i ) => i !== idx ) } );
	};

	const moveLink = ( idx, direction ) => {
		const updated = [ ...navLinks ];
		const targetIdx = idx + direction;
		if ( targetIdx < 0 || targetIdx >= updated.length ) return;
		[ updated[ idx ], updated[ targetIdx ] ] = [ updated[ targetIdx ], updated[ idx ] ];
		setAttributes( { navLinks: updated } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Logo', 'as-theme' ) }>
					<TextControl
						label={ __( 'Logo Text', 'as-theme' ) }
						value={ logoText }
						onChange={ ( val ) => setAttributes( { logoText: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Navigation Links', 'as-theme' ) }>
					{ navLinks.map( ( link, i ) => (
						<div key={ i } style={ { marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e0e0e0' } }>
							<TextControl
								label={ __( 'Label', 'as-theme' ) }
								value={ link.label }
								onChange={ ( val ) => updateLink( i, 'label', val ) }
							/>
							<TextControl
								label={ __( 'URL', 'as-theme' ) }
								value={ link.url }
								onChange={ ( val ) => updateLink( i, 'url', val ) }
							/>
							<div style={ { display: 'flex', gap: '4px' } }>
								<Button
									variant="tertiary"
									size="small"
									onClick={ () => moveLink( i, -1 ) }
									disabled={ i === 0 }
								>↑</Button>
								<Button
									variant="tertiary"
									size="small"
									onClick={ () => moveLink( i, 1 ) }
									disabled={ i === navLinks.length - 1 }
								>↓</Button>
								<Button
									isDestructive
									variant="link"
									size="small"
									onClick={ () => removeLink( i ) }
								>{ __( 'Remove', 'as-theme' ) }</Button>
							</div>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addLink }>
						{ __( 'Add Link', 'as-theme' ) }
					</Button>
				</PanelBody>
				<PanelBody title={ __( 'CTA Button', 'as-theme' ) }>
					<TextControl
						label={ __( 'Button Text', 'as-theme' ) }
						value={ ctaText }
						onChange={ ( val ) => setAttributes( { ctaText: val } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'as-theme' ) }
						value={ ctaUrl }
						onChange={ ( val ) => setAttributes( { ctaUrl: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="nav-inner">
					<span className="nav-logo"><span>{ logoText }</span></span>
					<ul className="nav-links">
						{ navLinks.map( ( link, i ) => (
							<li key={ i }><a>{ link.label }</a></li>
						) ) }
						<li><a className="nav-hire">{ ctaText }</a></li>
					</ul>
				</div>
			</div>
		</>
	);
}
