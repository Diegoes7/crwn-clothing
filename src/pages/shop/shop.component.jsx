import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateCollections } from '../../redux/shop/shop.actions'

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.util";

import WithSpinner from '../../components/with-spinner/with-spinner.component'


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends React.Component {
 /*  constructor(){
    super()

    this.state = {
      loading: true
    }
  } */
  state = {
    loading:true
  }
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections} = this.props
    const collectionRef = firestore.collection("collections");

    /* fetch(`https://firestore.googleapis.com/v1/projects/crwn-db-6f72b/databases/(default)/documents/collections`)
    .then(response => response.json())
    .then(collections => console.log(collections))
    promises way
 */
    collectionRef.get()
    .then(snapshot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
     updateCollections(collectionMap)
     this.setState({loading: false})
    })
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) =>
           <CollectionOverviewWithSpinner isLoading={ loading } {...props}/>} />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}
        />
      </div>
    );
  }
}

const mapDispachToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null,
   mapDispachToProps
  )(ShopPage);
