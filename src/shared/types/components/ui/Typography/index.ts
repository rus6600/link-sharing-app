import { ReactNode } from 'react'

export type VariantUnion =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'

type colorsUnion =
    | 'purple-300'
    | 'purple-600'
    | 'purple-400'
    | 'black'
    | 'grey-600'
    | 'grey-400'
    | 'grey-300'
    | 'white'
    | 'red'
    | 'skeleton'

type fontSizeUnion = 'lg' | 'md' | 'sm'
type fontWeightUnion = '400' | '600' | '700'
type textAlignUnion = 'center' | 'left' | 'right'
type merginBlockUnion = '8' | '16' | '32'

export type TypographyProps = {
    variant?: VariantUnion
    children: ReactNode
    fontSize?: fontSizeUnion
    color?: colorsUnion
    fontWeight?: fontWeightUnion
    textAlign?: textAlignUnion
    marginBlock?: merginBlockUnion
}
