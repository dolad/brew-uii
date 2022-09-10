import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

type IBreweryProps = {
    items: any 
}

const BreweryList = (props: IBreweryProps) => {
    const {items}= props;
    const BrewereyItem = ({item}: any) => (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={item.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {item.country}
                            </Typography>
                            {" — "} {item.state} {" "} {item.city} {" "} {item.street} {item.phone}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )

    return (

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           {
            items && items.length > 0 && items.map((item: any, index: number) => <BrewereyItem item={item} key={`breweryItem${index}`} /> )
           }
        </List>



    );
}

export default BreweryList