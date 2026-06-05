import { Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const personal = data.personalInfo || {};

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed p-8">
      <header className="flex gap-6 pb-6 border-b-2">
        {personal.image && (
          <img
            src={personal.image}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border"
            style={{ borderColor: accentColor }}
          />
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
            {personal.fullName || "Enter Your FullName"}
          </h1>
          <h2 className="text-lg my-2 text-gray-600 font-semibold">
            {personal.jobTitle}
          </h2>

          <ContactInfo personal={personal} />
        </div>
      </header>

      <ResumeContent data={data} accentColor={accentColor} />
    </div>
  );
};

const ContactInfo = ({ personal }) => (
  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-3">
    {personal.email && <Item icon={<Mail />} text={personal.email} />}
    {personal.phone && <Item icon={<Phone />} text={personal.phone} />}
    {personal.address && <Item icon={<MapPin />} text={personal.address} />}
    {personal.linkedIn_url && (
      <Item icon={<Link2 />} text={personal.linkedIn_url} />
    )}
    {personal.portfolio_url && (
      <Item icon={<Globe />} text={personal.portfolio_url} />
    )}
  </div>
);

const Item = ({ icon, text }) => (
  <div className="flex items-center gap-1">
    {icon && <span className="[&>svg]:size-4">{icon}</span>}
    <span>{text}</span>
  </div>
);

const SectionTitle = ({ children, accentColor }) => (
  <h2
    className="text-lg font-bold uppercase border-b pb-1 mb-3 mt-6"
    style={{ color: accentColor, borderColor: accentColor }}
  >
    {children}
  </h2>
);

const ResumeContent = ({ data, accentColor }) => (
  <>
    {data.summary && (
      <section>
        <SectionTitle accentColor={accentColor}>Summary</SectionTitle>
        <p className="text-sm text-gray-700">{data.summary}</p>
      </section>
    )}

    {data.experience?.length > 0 && (
      <section>
        <SectionTitle accentColor={accentColor}>Experience</SectionTitle>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-sm font-medium text-gray-700">
                  {exp.company}
                </p>
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
      </section>
    )}

    {data.education?.length > 0 && (
      <section>
        <SectionTitle accentColor={accentColor}>Education</SectionTitle>
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
      </section>
    )}

    {data.project?.length > 0 && (
      <section>
        <SectionTitle accentColor={accentColor}>Projects</SectionTitle>
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
      </section>
    )}

    {data.skills?.length > 0 && (
      <section>
        <SectionTitle accentColor={accentColor}>Skills</SectionTitle>
        <p className="text-sm text-gray-700">{data.skills.join(", ")}</p>
      </section>
    )}
  </>
);

export default ModernTemplate;
