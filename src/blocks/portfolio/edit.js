import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

const GRADIENTS = [
	{ label: 'Purple → Violet', value: 'pt-1' },
	{ label: 'Pink → Red', value: 'pt-2' },
	{ label: 'Blue → Cyan', value: 'pt-3' },
	{ label: 'Green → Teal', value: 'pt-4' },
	{ label: 'Pink → Yellow', value: 'pt-5' },
	{ label: 'Lavender → Pink', value: 'pt-6' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { tag, heading, projects, ctaText, ctaUrl } = attributes;
	const blockProps = useBlockProps( { className: 'portfolio' } );

	const updateProject = ( idx, field, value ) => {
		const updated = [ ...projects ];
		updated[ idx ] = { ...updated[ idx ], [ field ]: value };
		setAttributes( { projects: updated } );
	};

	const addProject = () => {
		setAttributes( { projects: [ ...projects, {
			imageId: 0, imageUrl: '', category: 'Web Design',
			name: 'New Project', description: 'Project description',
			url: '#', gradient: 'pt-1',
		} ] } );
	};

	const removeProject = ( idx ) => {
		setAttributes( { projects: projects.filter( ( _, i ) => i !== idx ) } );
	};

	const moveProject = ( idx, direction ) => {
		const updated = [ ...projects ];
		const targetIdx = idx + direction;
		if ( targetIdx < 0 || targetIdx >= updated.length ) return;
		[ updated[ idx ], updated[ targetIdx ] ] = [ updated[ targetIdx ], updated[ idx ] ];
		setAttributes( { projects: updated } );
	};

	const onSelectImage = ( idx, media ) => {
		updateProject( idx, 'imageId', media.id );
		updateProject( idx, 'imageUrl', media.url );
	};

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
				<PanelBody title={ __( 'CTA Button', 'as-theme' ) }>
					<TextControl
						label={ __( 'Button Text', 'as-theme' ) }
						value={ ctaText }
						onChange={ ( val ) => setAttributes( { ctaText: val } ) }
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Button URL', 'as-theme' ) }
						value={ ctaUrl }
						onChange={ ( val ) => setAttributes( { ctaUrl: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				{ projects.map( ( project, i ) => (
					<PanelBody key={ i } title={ `#${ i + 1 } — ${ project.name }` } initialOpen={ false }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => onSelectImage( i, media ) }
								allowedTypes={ [ 'image' ] }
								value={ project.imageId }
								render={ ( { open } ) => (
									<div style={ { marginBottom: '12px' } }>
										{ project.imageUrl ? (
											<>
												<img src={ project.imageUrl } alt="" style={ { width: '100%', borderRadius: '4px', marginBottom: '8px' } } />
												<div style={ { display: 'flex', gap: '8px' } }>
													<Button variant="secondary" size="small" onClick={ open }>{ __( 'Replace', 'as-theme' ) }</Button>
													<Button isDestructive variant="link" size="small" onClick={ () => { updateProject( i, 'imageId', 0 ); updateProject( i, 'imageUrl', '' ); } }>
														{ __( 'Remove', 'as-theme' ) }
													</Button>
												</div>
											</>
										) : (
											<Button variant="secondary" onClick={ open }>{ __( 'Select Screenshot', 'as-theme' ) }</Button>
										) }
									</div>
								) }
							/>
						</MediaUploadCheck>
						<TextControl
							label={ __( 'Category', 'as-theme' ) }
							value={ project.category }
							onChange={ ( val ) => updateProject( i, 'category', val ) }
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Name', 'as-theme' ) }
							value={ project.name }
							onChange={ ( val ) => updateProject( i, 'name', val ) }
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Description', 'as-theme' ) }
							value={ project.description }
							onChange={ ( val ) => updateProject( i, 'description', val ) }
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'URL', 'as-theme' ) }
							value={ project.url }
							onChange={ ( val ) => updateProject( i, 'url', val ) }
							__nextHasNoMarginBottom
						/>
						<div style={ { display: 'flex', gap: '4px', alignItems: 'center', marginTop: '12px' } }>
							<Button variant="tertiary" size="small" onClick={ () => moveProject( i, -1 ) } disabled={ i === 0 }>↑</Button>
							<Button variant="tertiary" size="small" onClick={ () => moveProject( i, 1 ) } disabled={ i === projects.length - 1 }>↓</Button>
							<Button isDestructive variant="link" size="small" onClick={ () => removeProject( i ) }>
								{ __( 'Remove', 'as-theme' ) }
							</Button>
						</div>
					</PanelBody>
				) ) }
				<div style={ { padding: '0 16px 16px' } }>
					<Button variant="secondary" onClick={ addProject }>
						{ __( 'Add Project', 'as-theme' ) }
					</Button>
				</div>
			</InspectorControls>

			<div { ...blockProps }>
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
						allowedFormats={ [] }
					/>
					<div className="port-grid">
						{ projects.map( ( project, i ) => (
							<div key={ i } className="port-card">
								<div className={ `port-thumb ${ project.imageUrl ? 'has-screenshot' : '' } ${ project.gradient }` }>
									{ project.imageUrl ? (
										<img src={ project.imageUrl } alt={ project.name } />
									) : (
										<span>{ project.name }</span>
									) }
								</div>
								<div className="port-info">
									<div className="port-tag">{ project.category }</div>
									<div className="port-name">{ project.name }</div>
									<div className="port-sub">{ project.description }</div>
								</div>
							</div>
						) ) }
					</div>
					<div className="port-more">
						<span className="btn btn-outline">{ ctaText } ↗</span>
					</div>
				</div>
			</div>
		</>
	);
}
