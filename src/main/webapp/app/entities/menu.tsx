import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/project">
        Project
      </MenuItem>
      <MenuItem icon="asterisk" to="/label">
        Label
      </MenuItem>
      <MenuItem icon="asterisk" to="/ticket">
        Ticket
      </MenuItem>
      <MenuItem icon="asterisk" to="/attachment">
        Attachment
      </MenuItem>
      <MenuItem icon="asterisk" to="/comment">
        Comment
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
