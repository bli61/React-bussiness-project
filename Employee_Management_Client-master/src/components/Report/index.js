import React from 'react';
import { Link } from 'react-router-dom';

const Report = ({report}) => {
  const style = {
    maxWidth: '50px',
    maxHeight: '50px'
  };

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col col-sm-2 col-lg-2">
          {report.imgUrl ? <img src={report.imgUrl} alt="employee image" style={style} />: (
            <img src="/static/images/default-avatar.png" alt="default avatar" style={style} />
          )}
        </div>
        <div className="col col-sm-4 col-lg-3" >
          <div>{report.name}</div>
          <div>{report.title}</div>
        </div>
        <div className="col">
          <div>{report.numberOfDirectReports}</div>
        </div>
        <div className="col">
          <Link to={`/${report._id}`}>Detail</Link>
        </div>
      </div>
    </li>
  )
};

export default Report;