import { Tooltip } from "antd";
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useState } from "react";


function Scrap(){
    const [scrapIcon, setScrapIcon] = useState(<StarOutlined style={{fontSize:'27px'}}/>);
    const [selected, setSelected] = useState(false);
    const clickIcon = () => {
        selected ? setSelected(false) : setSelected(true);
        selected ? (
            setScrapIcon(<StarFilled style={{fontSize:'27px'}}/>)
            ) : (setScrapIcon(<StarOutlined style={{fontSize:'27px'}}/>));
    };

    return(
        <div onClick={clickIcon}>
            <Tooltip title ="저장">
                {scrapIcon}
            </Tooltip>
        </div>
    );
}

export default Scrap;