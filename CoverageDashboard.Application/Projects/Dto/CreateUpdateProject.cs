using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoverageDashboard.Application.Projects.Dto
{
   public class CreateUpdateProject
    {
        [Range(1,int.MaxValue)]
        public int Id { get; set; }

        [Required]
        public string Code { get; set; }

        public string Description { get; set; }

        [Required]
        public string AssignedTo { get; set; }
    }
}
