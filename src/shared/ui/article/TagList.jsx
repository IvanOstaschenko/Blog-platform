import { List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

export function TagList({ dataList }) {
  return (
    <List sx={{ display: 'flex', gap: '8px' }}>
      {dataList.map(
        (tag, index) =>
          tag && (
            <ListItem
              key={tag + `${index}`}
              sx={{
                height: '20px',
                border: '1px solid #000',
                borderRadius: '2px',
                width: 'auto',
                fontSize: '12px',
                paddingInline: '5px',
                overflow: 'hidden',
              }}
            >
              <ListItemText>{tag}</ListItemText>
            </ListItem>
          ),
      )}
    </List>
  );
}
TagList.propTypes = {
  dataList: PropTypes.array.isRequired,
};
