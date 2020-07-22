import React from 'react';
import { unblockIP } from '../../apis/block_ip';
import BlockListTable from './BlockListTable';
import {
  getBlockList as getFromMySQL,
  deleteBlockIP,
} from '../../apis/block_ip_nodejs';
class BlockListPage extends React.Component {
  state = { blockList: [] };

  getBlockList = async () => {
    let blockList = await getFromMySQL();
    // let blockListArr = [];
    // blockListArr = blockListArr.concat(
    //   blockList.wan,
    //   blockList.lan,
    //   blockList.management,
    //   blockList.dmz
    // );

    this.setState({ blockList });
  };
  onUnblockIP = async (ip) => {
    await unblockIP(ip);
    await deleteBlockIP(ip);
    this.getBlockList();
  };

  componentDidMount() {
    this.getBlockList();
  }

  render() {
    return (
      <div className="row m-3">
        <div className="offset-md-3 col-md-6">
          <BlockListTable
            blockListArr={this.state.blockList}
            onUnblockIP={this.onUnblockIP}
          />
        </div>
      </div>
    );
  }
}

export default BlockListPage;
