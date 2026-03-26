import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { tag, heading, description, links, formFields, submitText, successMessage, successDetail } = attributes;
	const blockProps = useBlockProps( { className: 'contact-section', id: 'contact' } );

	const updateLink = ( idx, field, value ) => {
		const updated = [ ...links ];
		updated[ idx ] = { ...updated[ idx ], [ field ]: value };
		setAttributes( { links: updated } );
	};

	const addLink = () => {
		setAttributes( { links: [ ...links, { label: 'New Link', url: 'https://' } ] } );
	};

	const removeLink = ( idx ) => {
		setAttributes( { links: links.filter( ( _, i ) => i !== idx ) } );
	};

	// Group half-width fields into rows
	const renderFormFields = () => {
		const rows = [];
		let i = 0;
		while ( i < formFields.length ) {
			const field = formFields[ i ];
			if ( field.half && i + 1 < formFields.length && formFields[ i + 1 ].half ) {
				rows.push(
					<div key={ i } className="form-row">
						{ renderField( formFields[ i ] ) }
						{ renderField( formFields[ i + 1 ] ) }
					</div>
				);
				i += 2;
			} else {
				rows.push( <div key={ i }>{ renderField( field ) }</div> );
				i++;
			}
		}
		return rows;
	};

	const renderField = ( field ) => (
		<div className="form-group">
			<label>{ field.label }</label>
			{ field.type === 'textarea' ? (
				<textarea placeholder={ field.placeholder } disabled />
			) : (
				<input type={ field.type } placeholder={ field.placeholder } disabled />
			) }
		</div>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Contact Links', 'as-theme' ) }>
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
							<Button isDestructive variant="link" onClick={ () => removeLink( i ) }>
								{ __( 'Remove', 'as-theme' ) }
							</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addLink }>
						{ __( 'Add Link', 'as-theme' ) }
					</Button>
				</PanelBody>
				<PanelBody title={ __( 'Form Settings', 'as-theme' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Submit Button Text', 'as-theme' ) }
						value={ submitText }
						onChange={ ( val ) => setAttributes( { submitText: val } ) }
					/>
					<TextControl
						label={ __( 'Success Message', 'as-theme' ) }
						value={ successMessage }
						onChange={ ( val ) => setAttributes( { successMessage: val } ) }
					/>
					<TextControl
						label={ __( 'Success Detail', 'as-theme' ) }
						value={ successDetail }
						onChange={ ( val ) => setAttributes( { successDetail: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="container">
					<div className="contact-grid">
						<div className="contact-info">
							<RichText
								tagName="span"
								className="tag"
								value={ tag }
								onChange={ ( val ) => setAttributes( { tag: val } ) }
								allowedFormats={ [] }
							/>
							<RichText
								tagName="h2"
								value={ heading }
								onChange={ ( val ) => setAttributes( { heading: val } ) }
								allowedFormats={ [ 'core/bold', 'core/italic' ] }
							/>
							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) => setAttributes( { description: val } ) }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
							/>
							<div className="contact-links">
								{ links.map( ( link, i ) => (
									<span key={ i } style={ { cursor: 'default' } }>{ link.label }</span>
								) ) }
							</div>
						</div>
						<div>
							<div className="contact-form">
								{ renderFormFields() }
								<button className="form-submit" disabled>{ submitText }</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
