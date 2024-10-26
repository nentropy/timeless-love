export default function Milestones() {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Milestones</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Render Milestone Cards */}
          <MilestoneCard title="First Steps" date="July 15, 2020" description="Took first steps in the living room." />
          <MilestoneCard title="First Word" date="May 2, 2020" description="Said 'Mama' for the first time." />
        </div>
      </div>
    );
  }