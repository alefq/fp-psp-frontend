import SnapshotsView from './view';
import NewSnapshot from './add/view';
import SnapshotView from './list/item/view';
import Bn from 'backbone';
import SnapshotItemModel from './list/item/model'


const snapshots = props => {
  const { app } = props;

  const routes = {
    appRoutes: {
      'snapshots/:id': 'showSnapshots',
      'survey/:id/answer': 'answerSurvey',
      'survey/:id/snapshot/:idSnap': 'showSnapshot'
    },
    controller: {
      showSnapshots(hash) {
        const surveyId = parseInt(hash, 10);
        app.showViewOnRoute(new SnapshotsView({ surveyId }));
      },
      answerSurvey(hash) {
        const surveyId = parseInt(hash, 10);

        const newSnapshotView = new NewSnapshot({
          organizationId : app.getSession().get('user').organization?  app.getSession().get('user').organization.id:null,
          surveyId: surveyId,
          handleCancel: function() {
            Bn.history.navigate(`/surveys`, true);
          },
          app: app
        });
    
        app.showViewOnRoute(newSnapshotView);
      },
      showSnapshot(hash, hashSnapshot) {
        const surveyId = parseInt(hash, 10);
        const snapshotId = parseInt(hashSnapshot, 10);

        const model = new SnapshotItemModel();
        model.fetch({
          data : {
            snapshot_id : snapshotId
          }
        }).then(data => {
          app.showViewOnRoute(new SnapshotView({ model }));
        })
        
      }
    }
  };

  return routes;
};

export default snapshots;
