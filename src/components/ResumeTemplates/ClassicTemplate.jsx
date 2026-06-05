import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const personal = data.personalInfo || {};

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed p-8">
      <header className="text-center mb-8 pb-6 border-b-2">
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {personal.fullName || "Enter Your FullName"}
        </h1>

        <h2 className="text-lg my-2 text-gray-600 font-semibold">
          {personal.jobTitle}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personal.email && <Item icon={<Mail />} text={personal.email} />}
          {personal.phone && <Item icon={<Phone />} text={personal.phone} />}
          {personal.address && (
            <Item icon={<MapPin />} text={personal.address} />
          )}
          {personal.linkedIn_url && (
            <Item icon={<Link2 />} text={personal.linkedIn_url} />
          )}
          {personal.portfolio_url && (
            <Item icon={<Globe />} text={personal.portfolio_url} />
          )}
        </div>
      </header>

      {data.summary && (
        <Section title="Summary" accentColor={accentColor}>
          <p className="text-sm text-gray-700">{data.summary}</p>
        </Section>
      )}

      {data.experience?.length > 0 && (
        <Section title="Experience" accentColor={accentColor}>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="text-sm font-medium">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500 whitespace-nowrap">
                  {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                </p>
              </div>
              {exp.description && (
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {data.education?.length > 0 && (
        <Section title="Education" accentColor={accentColor}>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-bold">{edu.intitutionName}</h3>
                  <p className="text-sm text-gray-700">
                    {edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <p className="text-sm text-gray-500 whitespace-nowrap">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {data.project?.length > 0 && (
        <Section title="Projects" accentColor={accentColor}>
          {data.project.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold">
                {project.name}{" "}
                {project.type && (
                  <span className="font-normal text-sm text-gray-500">
                    ({project.type})
                  </span>
                )}
              </h3>
              {project.description && (
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {data.skills?.length > 0 && (
        <Section title="Skills" accentColor={accentColor}>
          <p className="text-sm text-gray-700">{data.skills.join(", ")}</p>
        </Section>
      )}
    </div>
  );
};

const Item = ({ icon, text }) => (
  <div className="flex items-center gap-1">
    <span className="[&>svg]:size-4">{icon}</span>
    <span>{text}</span>
  </div>
);

const Section = ({ title, accentColor, children }) => (
  <section className="mb-6">
    <h2
      className="text-lg font-bold uppercase border-b pb-1 mb-3"
      style={{ color: accentColor, borderColor: accentColor }}
    >
      {title}
    </h2>
    {children}
  </section>
);

export default ClassicTemplate;
