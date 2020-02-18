import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectColectionForPreview } from '../../redux/shop/shop.selectors'


import CollectionPreview from '../collection-preview/collection-preview.component'

import './collections-overview.styles.scss'

const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
        {collections.map(({ id, ...otherCollectionsProps }) => (
             <CollectionPreview key={id} {...otherCollectionsProps} />
         ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectColectionForPreview
})

export default connect(mapStateToProps)
(CollectionsOverview)