import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { copyright, tagline, links } = attributes;
	const blockProps = useBlockProps( { className: 'footer' } );

	const updateLink = ( index, field, value ) => {
		const updated = [ ...links ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { links: updated } );
	};

	const addLink = () => {
		setAttributes( {
			links: [ ...links, { label: 'New Link', url: 'https://' } ],
		} );
	};

	const removeLink = ( index ) => {
		const updated = links.filter( ( _, i ) => i !== index );
		setAttributes( { links: updated } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Footer Links', 'as-theme' ) }>
					{ links.map( ( link, i ) => (
						<div key={ i } style={ { marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #ddd' } }>
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
							<Button
								isDestructive
								variant="link"
								onClick={ () => removeLink( i ) }
							>
								{ __( 'Remove', 'as-theme' ) }
							</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addLink }>
						{ __( 'Add Link', 'as-theme' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="container">
					<p>
						&copy; { new Date().getFullYear() }{ ' ' }
						<RichText
							tagName="span"
							value={ copyright }
							onChange={ ( val ) => setAttributes( { copyright: val } ) }
							placeholder={ __( 'Your name', 'as-theme' ) }
							allowedFormats={ [] }
						/>
					</p>
					<p>
						<RichText
							tagName="span"
							value={ tagline }
							onChange={ ( val ) => setAttributes( { tagline: val } ) }
							placeholder={ __( 'Tagline...', 'as-theme' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
					</p>
					<div className="footer-links">
						{ links.map( ( link, i ) => (
							<a key={ i } href={ link.url }>
								{ link.label }
							</a>
						) ) }
					</div>
				</div>
			</div>
		</>
	);
}
