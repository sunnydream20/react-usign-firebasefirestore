import map from 'lodash/map'
import merge from 'lodash/merge'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import { ColorWrap } from 'react-color/lib/components/common'
import GithubSwatch from 'react-color/lib/components/github/GithubSwatch'

export const colors = [
	'#404040', '#565656', '#767676', '#363636', '#642A9E', '#862A9D', '#9C2B91', '#9C2B6F',
	"#41AC39", '#AC3939', '#AC6939', '#39A3AC', '#3988AC', '#396DAC', '#3953AC', '#3C39AC']

export const ColorPicker = ({ handleColorChange, isEnabled, onSwatchHover, triangle,
	styles: passedStyles = {}, className = '', positioningStyles }) => {
	const styles = reactCSS(merge({
		'default': {
			card: {
				width: '212px',
				// background: '#808080',
				background: '#b4b4b4',
				border: '1px solid rgba(0,0,0,0.2)',
				boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
				borderRadius: '4px',
				position: 'relative',
				...positioningStyles,
				padding: '5px',
				display: 'flex',
				flexWrap: 'wrap',
				cursor: isEnabled ? 'pointer' : 'default'
			},
			triangle: {
				position: 'absolute',
				border: '7px solid transparent',
				borderBottomColor: '#b4b4b4',
			},
			triangleShadow: {
				position: 'absolute',
				border: '8px solid transparent',
				borderBottomColor: 'rgba(0,0,0,0.15)',
			},
		},
		'hide-triangle': {
			triangle: {
				display: 'none',
			},
			triangleShadow: {
				display: 'none',
			},
		},
		'top-left-triangle': {
			triangle: {
				top: '-14px',
				left: '10px',
			},
			triangleShadow: {
				top: '-16px',
				left: '9px',
			},
		},
		'top-right-triangle': {
			triangle: {
				top: '-14px',
				right: '10px',
			},
			triangleShadow: {
				top: '-16px',
				right: '9px',
			},
		},
		'bottom-left-triangle': {
			triangle: {
				top: '35px',
				left: '10px',
				transform: 'rotate(180deg)',
			},
			triangleShadow: {
				top: '37px',
				left: '9px',
				transform: 'rotate(180deg)',
			},
		},
		'bottom-right-triangle': {
			triangle: {
				top: '35px',
				right: '10px',
				transform: 'rotate(180deg)',
			},
			triangleShadow: {
				top: '37px',
				right: '9px',
				transform: 'rotate(180deg)',
			},
		},
	}, passedStyles), {
		'hide-triangle': triangle === 'hide',
		'top-left-triangle': triangle === 'top-left',
		'top-right-triangle': triangle === 'top-right',
		'bottom-left-triangle': triangle === 'bottom-left',
		'bottom-right-triangle': triangle === 'bottom-right',
	})

	const handleChange = (hex, e) => handleColorChange({ hex, source: 'hex' }, e)

	return (
		<div style={{ position: 'absolute' }}>
			<div style={styles.card} className={`github-picker ${className}`}>
				<div style={styles.triangleShadow} />
				<div style={styles.triangle} />
				{map(colors, c => (
					<GithubSwatch
						color={c}
						key={c}
						onClick={handleChange}
						onSwatchHover={onSwatchHover}
					/>
				))}
			</div>
		</div>
	)
}

ColorPicker.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	colors: PropTypes.arrayOf(PropTypes.string),
	triangle: PropTypes.oneOf(['hide', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
	styles: PropTypes.object,
}

ColorPicker.defaultProps = {
	width: 200,
	colors: [...colors],
	triangle: 'top-left',
	styles: {},
};

export default ColorWrap(ColorPicker)