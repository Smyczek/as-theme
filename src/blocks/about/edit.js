import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { tag, heading, paragraphs, skillGroups } = attributes;
	const blockProps = useBlockProps( { className: 'about', id: 'about' } );

	const updateParagraph = ( index, value ) => {
		const updated = [ ...paragraphs ];
		updated[ index ] = value;
		setAttributes( { paragraphs: updated } );
	};

	const updateSkillGroup = ( groupIdx, field, value ) => {
		const updated = [ ...skillGroups ];
		updated[ groupIdx ] = { ...updated[ groupIdx ], [ field ]: value };
		setAttributes( { skillGroups: updated } );
	};

	const updateSkill = ( groupIdx, skillIdx, field, value ) => {
		const updated = [ ...skillGroups ];
		const skills = [ ...updated[ groupIdx ].skills ];
		skills[ skillIdx ] = { ...skills[ skillIdx ], [ field ]: value };
		updated[ groupIdx ] = { ...updated[ groupIdx ], skills };
		setAttributes( { skillGroups: updated } );
	};

	const addSkill = ( groupIdx ) => {
		const updated = [ ...skillGroups ];
		const skills = [ ...updated[ groupIdx ].skills, { name: 'New Skill', highlighted: false } ];
		updated[ groupIdx ] = { ...updated[ groupIdx ], skills };
		setAttributes( { skillGroups: updated } );
	};

	const removeSkill = ( groupIdx, skillIdx ) => {
		const updated = [ ...skillGroups ];
		const skills = updated[ groupIdx ].skills.filter( ( _, i ) => i !== skillIdx );
		updated[ groupIdx ] = { ...updated[ groupIdx ], skills };
		setAttributes( { skillGroups: updated } );
	};

	return (
		<>
			<InspectorControls>
				{ skillGroups.map( ( group, gi ) => (
					<PanelBody
						key={ gi }
						title={ group.title || __( 'Skill Group', 'as-theme' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Group Title', 'as-theme' ) }
							value={ group.title }
							onChange={ ( val ) => updateSkillGroup( gi, 'title', val ) }
						/>
						{ group.skills.map( ( skill, si ) => (
							<div key={ si } style={ { marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #eee' } }>
								<TextControl
									label={ __( 'Skill', 'as-theme' ) }
									value={ skill.name }
									onChange={ ( val ) => updateSkill( gi, si, 'name', val ) }
								/>
								<ToggleControl
									label={ __( 'Highlighted', 'as-theme' ) }
									checked={ skill.highlighted }
									onChange={ ( val ) => updateSkill( gi, si, 'highlighted', val ) }
								/>
								<Button
									isDestructive
									variant="link"
									onClick={ () => removeSkill( gi, si ) }
								>
									{ __( 'Remove', 'as-theme' ) }
								</Button>
							</div>
						) ) }
						<Button variant="secondary" onClick={ () => addSkill( gi ) }>
							{ __( 'Add Skill', 'as-theme' ) }
						</Button>
					</PanelBody>
				) ) }
			</InspectorControls>

			<div { ...blockProps }>
				<div className="container">
					<div className="about-grid">
						<div>
							<RichText
								tagName="span"
								className="tag"
								value={ tag }
								onChange={ ( val ) => setAttributes( { tag: val } ) }
								allowedFormats={ [] }
								placeholder={ __( 'Tag...', 'as-theme' ) }
							/>
							<RichText
								tagName="h2"
								className="section-heading"
								value={ heading }
								onChange={ ( val ) => setAttributes( { heading: val } ) }
								allowedFormats={ [ 'core/bold', 'core/italic' ] }
								placeholder={ __( 'Heading...', 'as-theme' ) }
							/>
							{ paragraphs.map( ( text, i ) => (
								<RichText
									key={ i }
									tagName="p"
									value={ text }
									onChange={ ( val ) => updateParagraph( i, val ) }
									allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
									placeholder={ __( 'Paragraph...', 'as-theme' ) }
								/>
							) ) }
						</div>
						<div>
							<div className="skills-cols">
								{ skillGroups.map( ( group, gi ) => (
									<div key={ gi } className="skill-group">
										<h4>{ group.title }</h4>
										<ul>
											{ group.skills.map( ( skill, si ) => (
												<li key={ si } className={ skill.highlighted ? 'hl' : undefined }>
													{ skill.name }
												</li>
											) ) }
										</ul>
									</div>
								) ) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
