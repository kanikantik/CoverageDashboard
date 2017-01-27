using CoverageDashboard.Application.Projects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CoverageDashboard.WebApi.Controllers
{

    [Route("api")]
    public class ProjectController : BaseApiController
    {
        //TO Do: Write the logic for the Constructor injection
        private readonly IProjectAppService _projectAppService;
        public ProjectController(IProjectAppService projectAppService)
        {
            _projectAppService = projectAppService;
        }

        [HttpGet]
        [Route("ping")]
        public async Task<IHttpActionResult> Ping()
        {
            return Ok("pong");
        }

        [HttpGet]
        [Route("projects")]
        public IHttpActionResult GetAllProjects()
        {
            return GetAllProjectsInternal();

        }

        [HttpGet]
        [Route("projects/{name}")]
        public IHttpActionResult GetProjectByName(string name)
        {
            return GetProjectByNameInternal(name);
        }



        #region ProjectControllerPrivateMethods
        private IHttpActionResult GetAllProjectsInternal()
        {
            //var result = await _businessLayer.GetAll();
            var result = "{Id:1,Name=CapabilityDashboard}";
            if (result != null)
            {
                return Ok(result);
            }
            else
                return NotFound();
        }


        private IHttpActionResult GetProjectByNameInternal(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest();
            }

            var result = "Projectbyname";
            if (result != null && result.Count() > 0)
            {
                return Ok(result);
            }
            else
                return NotFound();
        }
        #endregion

    }
}
