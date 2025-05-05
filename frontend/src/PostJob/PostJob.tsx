import { Button, NumberInput, TagsInput } from "@mantine/core";
import { fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./RichTextEditor";
import { isNotEmpty, useForm } from "@mantine/form";

const PostJob = () => {
  const select = fields;

  const form = useForm({
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: "",
    },
    validate: {
      jobTitle: isNotEmpty("Title is Required"),
      company: isNotEmpty("Company is Required"),
      experience: isNotEmpty("Experience is Required"),
      jobType: isNotEmpty("JobType is Required"),
      location: isNotEmpty("Location is Required"),
      packageOffered: isNotEmpty("PackageOffered is Required"),
      skillsRequired: isNotEmpty("SkillsRequired is Required"),
      about: isNotEmpty("About is Required"),
      description: isNotEmpty("Description is Required"),
    },
  });

  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput
            {...form.getInputProps('packageOffered')}
            label="Salary"
            withAsterisk
            min={1}
            max={300}
            clampBehavior="strict"
            placeholder="Enter Salary"
            hideControls
          />
        </div>
        <TagsInput
          {...form.getInputProps('skillsRequired')}
          acceptValueOnBlur
          withAsterisk
          splitChars={[",", " ", "|"]}
          label="Skills"
          placeholder="Enter skill"
        />
        <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
          <div className="text-sm font-medium">Jon Description</div>
          <TextEditor />
        </div>
        <div className="flex gap-4">
          <Button color="bright-sun.4" variant="light">
            Publish Job
          </Button>
          <Button color="bright-sun.4" variant="outline">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PostJob;
