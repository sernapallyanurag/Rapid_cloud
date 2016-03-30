
var express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes')
  , manage = require('./routes/manage')
  , view = require('./routes/view')
  , project = require('./routes/project')
  , manage_nodes = require('./routes/manage_nodes')
  , secGroups = require('./routes/secGroup')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}
//New page functions
app.get('/master_2', routes.master_2);
app.get('/create_template', routes.create_template);
app.get('/assignNode', routes.assignNode);
app.get('/deployTemplate', routes.deployTemplate);

//Old page functions
app.get('/master', routes.master);
app.get('/', routes.index);
app.get('/next', routes.next);
app.get('/proj', routes.proj);
app.get('/drop_down', routes.drop_down);
app.post('/filter', routes.filter);
app.get('/create', routes.create);
app.get('/tmplt_pg', routes.tmplt_pg);
app.get('/tmplt_create', routes.tmplt_create);
app.get('/all_nodes', routes.all_nodes);

app.get('/manage', manage.manage);
app.get('/deploy', manage.deploy);
app.post('/deploy_data', manage.deploy_data);
app.get('/manage_env', manage.manage_env);
app.get('/create_vpc', manage.create_vpc);
app.post('/vpc', manage.vpc);
app.post('/subnet', manage.subnet);
app.post('/routeTable', manage.routeTable);
app.post('/gateWay', manage.gateWay);
app.post('/createStorage', manage.createStorage);
app.post('/createSecGroup', manage.createSecGroup);
app.post('/createKeyPair', manage.createKeyPair);
app.post('/deployTemplate', manage.deployTemplate);

app.get('/actions', manage.actions);
app.get('/vpc_deploy',manage.vpc_deploy);
app.get('/subnet_deploy',manage.subnet_deploy);
app.get('/project',manage.project);
app.post('/store_template',manage.store_template);
app.get('/new_template',routes.new_template);
app.get('/manage_template',routes.manage_template);
app.get('/preview', view.preview);
app.post('/viewdata',view.viewdata);
app.post('/temp_image', routes.temp_image);
app.post('/temp_region', routes.temp_region);
app.post('/temp_store', routes.temp_store);
app.get('/create_template2', routes.create_template2);
app.get('/nodes_details', routes.nodes_details);
app.post('/pvd_template', routes.pvd_template);
app.post('/gen_template', routes.gen_template);
app.get('/pvd_check', routes.pvd_check);
//app.get('/project_page', project.project_page);
//app.get('/project_view', project.project_view);


app.get('/gen_view', view.gen_view);
app.get('/my_view', view.my_view);
app.post('/node_store', view.node_store);
app.get('/name_check', view.name_check);
app.get('/create_org_temp', view.create_org_temp);

//app.get('/core', routes.core);

app.get('/org_temp', view.org_temp);
//app.get('/org_temp', view.org_temp);
app.get('/vpc_deploy',manage.vpc_deploy);
app.post('/filter_env',manage.filter_env);
app.post('/popup_nodes',manage.popup_nodes);
app.post('/node_details',manage.node_details);
app.post('/manage_env_nodes',manage.manage_env_nodes);
app.get('/cloud_service',routes.cloud_service);
app.get('/prod_stage',routes.prod_stage);
app.post('/create_cloud_service',routes.create_cloud_service);
app.get('/cloudname',routes.cloudname);
app.get('/azure_size',routes.azure_size);
app.get('/azure_image',routes.azure_image);
app.post('/cloud_project',manage.cloud_project);
app.post('/create_deploy_slot',routes.create_deploy_slot);
app.post('/filter_slot',manage.filter_slot);
app.get('/list_cloud_service',manage.list_cloud_service)

//New manage screen
app.get('/manageEnv', manage.manageEnv);

//Mange stg, sec, kp
app.get('/volumeDetails', manage.volumeDetails);
app.get('/keyPairDetails', manage.keyPairDetails);
app.get('/secGrpDetails', manage.secGrpDetails);
app.get('/attachVolume', manage.attachVolume);
app.get('/attachKeyPair', manage.attachKeyPair);
app.get('/attachSecGrp', manage.attachSecGrp);


http.createServer(app).listen(app.get('port'), "172.29.59.65", function(){

  console.log('Express server listening on port ' + app.get('port'));
});
