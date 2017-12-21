import React from 'react'
import { Dropdown, Grid, Input } from 'semantic-ui-react'

const Search = (props) => {
  // Handles input changes to search box
  const handleInputChange = (event) => {
    props.setSearchTerm(event.target.value.toLowerCase());
  }

  // Adds a filter option
  const addSearchFilter = (event, { label, text }) => {
    if (label){
      props.addSearchFilter({name: text, item: label.className, type: 'colour'});
    } else {
      props.addSearchFilter({name: text, item: text, type: 'permission'});
    }
  }

  return(
    <Grid.Row className='search'>
      <Grid.Column style={{padding: '14px 0px'}}>
        <Input fluid icon='search' placeholder='Search...' onChange={handleInputChange} />
      </Grid.Column>
      <Grid.Column width={1} style={{padding: '15px'}}>
        <Dropdown icon='filter' floating button pointing className='icon teal top right'>
          <Dropdown.Menu>
            <Dropdown.Header content='Filter' />
            <Dropdown.Divider />
            <Dropdown.Item className='filter nested dropdown'>
              <Dropdown icon='paint brush' pointing className='left'>
                <Dropdown.Menu className='left'>
                  <Dropdown.Header content='By colour' />
                  <Dropdown.Divider />
                  <Dropdown.Item label={{ className: 'white', empty: true, circular: true }} text='White' onClick={addSearchFilter} />
                  <Dropdown.Item label={{ className: 'lightgreen', empty: true, circular: true }} text='Green' onClick={addSearchFilter} />
                  <Dropdown.Item label={{ className: 'lightskyblue', empty: true, circular: true }} text='Blue' onClick={addSearchFilter} />
                  <Dropdown.Item label={{ className: 'lightcoral', empty: true, circular: true }} text='Red' onClick={addSearchFilter} />
                  <Dropdown.Item label={{ className: 'yellow', empty: true, circular: true }} text='Yellow' onClick={addSearchFilter} />
                  <Dropdown.Item label={{ className: 'rosybrown', empty: true, circular: true }} text='Brown' onClick={addSearchFilter} />
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item className='filter nested dropdown'>
              <Dropdown icon='user' pointing className='left'>
                <Dropdown.Menu className='left'>
                  <Dropdown.Header content='By my permissions' />
                  <Dropdown.Divider />
                  <Dropdown.Item text='Owner' onClick={addSearchFilter} />
                  <Dropdown.Item text='Editor' onClick={addSearchFilter} />
                  <Dropdown.Item text='Viewer' onClick={addSearchFilter} />
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid.Column>
    </Grid.Row>
  )
}

export default Search
