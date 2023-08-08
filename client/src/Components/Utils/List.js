import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import Avatar from './Avatar';
import { useNavigate } from 'react-router-dom';
function SimpleDialog(props) {
  const navigate= useNavigate();
  const { onClose, selectedValue, open,list } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    navigate("/profile/"+value);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0,width:300 }}>
        {list.map((username) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(username)} key={username}>
              <ListItemAvatar>
                <Avatar username={username}/>
              </ListItemAvatar>
              <ListItemText primary={username} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState();
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    props.show(false);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        list={props.list}
      />
    </div>
  );
}
