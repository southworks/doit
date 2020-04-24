const taskModel = require('../model/task.model');

const createTasks = async () => {
   for (const item of items){
        await taskModel.create(item);
   }
};

module.exports = createTasks;

/*DATA*/
const items = [
	{
		name: 'Hacer asado',
		is_completed: false,
		created_at: '2020-04-20T15:27:16.181Z',
		deleted: true,
	},
	{
		name: 'comprar fernet',
		is_completed: false,
		created_at: '2020-04-20T15:27:16.181Z',
		deleted: false,
	},
	{
		name: 'comprar coca',
		is_completed: false,
		created_at: '2020-04-20T15:27:16.182Z',
		deleted: false,
	},
	{
		name: 'comprar verdura',
		is_completed: false,
		created_at: '2020-04-15T16:49:40.683Z',
		deleted: false,
	},
	{
		name: 'comprar agua',
		is_completed: false,
		created_at: '2020-04-15T16:50:58.399Z',
		deleted: true,
	},
	{
		name: 'comprar asado',
		is_completed: false,
		created_at: '2020-04-15T17:18:08.567Z',
		deleted: false,
	},
	{
		name: 'comprar servilletas',
		is_completed: false,
		created_at: '2020-04-15T17:27:58.983Z',
		deleted: false,
	},
	{		
		_id: '999999999999999999999999',
		name: "Test with forced ID",
		is_completed: false,
		created_at: "2020-04-15T17:27:58.983Z",
		deleted: false,
	},
];
