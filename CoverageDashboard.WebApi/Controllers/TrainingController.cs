using CoverageDashboard.Core.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using CoverageDashboard.Application.Trainings;
using CoverageDashboard.Application.Trainings.Dto;
using CoverageDashboard.Core.Application;

namespace CoverageDashboard.WebApi.Controllers
{

    public class TrainingController : WebApiController
    {
        private readonly ITrainingAppService _trainingAppservice;
        public TrainingController(ITrainingAppService trainingAppservice)
        {
            _trainingAppservice = trainingAppservice;
        }


        //POST: /api/Training
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]TrainingInputDto req)
        {
            var result = await _trainingAppservice.CreateorUpdateTraining(req);

            return Ok(result);
        }
        //GET: /api/Training
        [HttpGet]
        public async Task<IHttpActionResult> GetAll()
        {
            var result = await _trainingAppservice.GetAllTrainingsAsync();

            return Ok(result);
        }

        // GET: api/Training/5
        [HttpGet]
        public string Get(int id)
        {
            return "value";
        }


        // PUT: api/Training/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Training/5
        public void Delete(int id)
        {
        }
    }
}
