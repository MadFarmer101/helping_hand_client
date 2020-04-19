import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'
import DisplayMap from './DisplayMap'
import axios from 'axios'

const ClaimTask = props => {
  let claimButton
  let mapDisplay
  let requestDisplay

  const dispatch = useDispatch()

  const getMap = async () => {
    let response = await axios.get('/tasks', { status: 'confirmed' })
    dispatch({ type: 'SAVE_REQUESTS', payload: response.data })
    if (!props.showHelpMap) {
      dispatch({ type: 'SHOW_MAP' })
    }
  }

  if (props.showHelpMap) {
    mapDisplay = <DisplayMap />
  }

  if (props.userID) {
    claimButton = (
      <Grid>
        <Grid.Column align='center'>
          <Button id='create-request' onClick={getMap.bind(this)}>
            Offer Help
          </Button>
        </Grid.Column>
      </Grid>
    )
  }

  //Showing Request list on Help page
  if (props.showHelpMap) {
    requestDisplay = props.requests.map(task => {
      let showProducts
      let i = 0
      
      //Iterate over the internal products list and show each product
      showProducts = task.products.map(product => {
        i++
        return (
          <div id={`task-product-${i}`} key={product.id} data-id={product.id}>
            {product.amount} -{product.name} -{product.total}
          </div>
        )
      })
      return (
        <>
          <div
            id={`task-${task.id}`}
            key={task.id}
            data-id={task.id}
            data-name={task.user.email}
            data-price={task.total}
          >
            <div id={`task-${task.id}-user`}>{task.user.email}</div>
            <div id={`task-${task.id}-products`}>{showProducts}</div>
            <div id={`task-${task.id}-total`}>{task.total}</div>
          </div>
        </>
      )
    })
  }

  return (
    <>
      {claimButton}
      <Grid style={{height: '1000px'}}>
        <Grid.Column width={14}>{mapDisplay}</Grid.Column>
        <Grid.Column width={2} id='request-list'>{requestDisplay}</Grid.Column>
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  return {
    showHelpMap: state.showHelpMap,
    userID: state.userID,
    requests: state.requests
  }
}
export default connect(mapStateToProps)(ClaimTask)
