
using System.ComponentModel.DataAnnotations;


namespace CoverageDashboard.Application.Projects.Dto
{
    public class ProjectInputDto
    {
       // [Range(1, int.MaxValue)]
        public string Id { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string AssignedTo { get; set; }
    }
}
