using CoverageDashboard.Application.Projects;
using CoverageDashboard.Application.Projects.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using CoverageDashboard.Core.Application;
using CoverageDashboard.Core.Controllers;
using CoverageDashboard.Core.Logging;


namespace CoverageDashboard.WebApi.Controllers
{

    public class ProjectController : WebApiController
    {
        private readonly IProjectAppService _projectAppService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ProjectController"/> class.
        /// </summary>
        public ProjectController(IProjectAppService projectAppService)
        {
            _projectAppService = projectAppService;
        }

        /// <summary>
        /// Get All Projects 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/project/Get")]
        public IHttpActionResult GetAllProjects()
        {
            var projects = _projectAppService.GetProjects();
            return Ok(projects);
        }



        /// <summary>
        /// Get All Projects 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/project/Get/{projectId}")]
        public IHttpActionResult GetProject([FromUri]string projectId)
        {
            var project = _projectAppService.GetProject(projectId);
            return Ok(project);
        }

        /// <summary>
        ///  delete specific project by id
        /// </summary>
        /// <param name="projectId">project id</param>
        [HttpDelete]
        [Route("api/project/Delete")]
        public void DeleteProject([FromUri]string projectId)
        {
            _projectAppService.DeleteProject(projectId);
        }

        /// <summary>
        /// Post method for creating project
        /// </summary>
        /// <param name="item"></param>
        /// <returns>CreateUpdateProject dto</returns>
        [HttpPost]
        [Route("api/project/CreateProject")]
        public IHttpActionResult Post(ProjectInputDto item)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var itemId = _projectAppService.CreateorUpdateProject(item);
                    if (itemId.Status == TaskStatus.RanToCompletion)
                        return Ok(itemId);
                    else
                    {
                        if (itemId.Exception != null)
                            return BadRequest(itemId.Exception.Message);
                    }
                }
                catch (Exception execption)
                {
                   
                    return BadRequest(execption.Message);
                }

            }

            return BadRequest(ModelState);
        }
        /// <summary>
        /// Put method for updating project
        /// </summary>
        /// <param name="item"></param>
        /// <returns>CreateUpdateProject Dto</returns>
        [HttpPut]
        [Route("api/project/UpdateProject")]
        public IHttpActionResult Put(ProjectInputDto item)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var itemId = _projectAppService.CreateorUpdateProject(item);
                    if (itemId.Status == TaskStatus.RanToCompletion)
                        return Ok(item);
                    else
                    {
                        if (itemId.Exception != null)
                            return BadRequest(itemId.Exception.Message);
                    }
                }
                catch (Exception execption)
                {
                    return BadRequest(execption.Message);
                }
            }
            return BadRequest(ModelState);
        }

        /// <summary>
        /// Test method for the api availability
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/project/ping")]
        public async Task<IHttpActionResult> Ping()
        {
            LogHelper.Debug("test");
            return Ok("pong");
        }

        /// <summary>
        /// Get All Projects Async
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/project/GetAll")]
        public async Task<IHttpActionResult> GetAllProjectAsync()
        {
            var result = await _projectAppService.GetAllProjectAsync();
            return Ok(result);
        }

       
    }

}
