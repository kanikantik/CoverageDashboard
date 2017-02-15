using CoverageDashboard.Application.Trainings.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Core.Application;

namespace CoverageDashboard.Application.Trainings
{
    public interface ITrainingAppService
    {
        Task<string> CreateorUpdateTraining(TrainingInputDto input);
        Task<IList<TrainingViewDto>> GetAllTrainingsAsync();
    }

    
}
