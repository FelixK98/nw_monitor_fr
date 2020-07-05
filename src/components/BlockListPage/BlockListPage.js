import React from 'react';
import { getBlockList, unblockIP } from '../../apis/block_ip';
import BlockListTable from './BlockListTable';
class BlockListPage extends React.Component {
  state = { blockList: [] };

  getBlockList = async () => {
    let blockList = await getBlockList();
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
    this.getBlockList();
  };

  componentDidMount() {
    this.getBlockList();
  }

  render() {
    return (
      <div className="row m-3">
        <div className="offset-md-4 col-md-4">
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
