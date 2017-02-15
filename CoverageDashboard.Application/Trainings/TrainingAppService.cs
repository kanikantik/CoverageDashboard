using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Application.Trainings.Dto;
using CoverageDashboard.Core.Application;
using CoverageDashboard.Mongo.Collections;
using CoverageDashboard.Mongo.Repositories;

namespace CoverageDashboard.Application.Trainings
{
    public class TrainingAppService : ApplicationService, ITrainingAppService
    {
        private readonly ITrainingRepository _trainingRepository;
        public TrainingAppService(ITrainingRepository trainingRepository)
        {
            _trainingRepository = trainingRepository;
        }
        public Task<string> CreateorUpdateTraining(TrainingInputDto input)
        {
            var training = AutoMapperConfig.Mapper.Map<TrainingInputDto, Training>(input);
            return _trainingRepository.InsertOrUpdateAndGetIdAsync(training);
        }

        public async Task<IList<TrainingViewDto>> GetAllTrainingsAsync()
        {
            var trainings = await _trainingRepository.GetAllListAsync();
            return new List<TrainingViewDto>(AutoMapperConfig.Mapper.Map<IList<Training>, IList<TrainingViewDto>>(trainings));
        }
    }
}
